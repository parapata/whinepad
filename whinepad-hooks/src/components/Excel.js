import Actions from "./Actions";
import Dialog from "./Dialog";
import Form from "./Form";
import FormInput from "./FormInput";
import Rating from "./Rating";
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Excel = props => {
  const [data, setData] = useState(props.initialData);
  const [sortby, setSortdy] = useState(null); // schema.id
  const [descending, setDescending] = useState(false);
  const [edit, setEdit] = useState(null); // [row index, schema.id],
  const [dialog, setDialog] = useState(null); // {type, idx}

  useEffect(() => {
    setData(props.initialData);
  }, [props.initialData]);

  const formRef = useRef();
  const formInputRef = useRef();

  const _fireDataChange = data => {
    props.onDataChange(data);
  };

  const _sort = key => {
    let workData = Array.from(data);
    const flg = sortby === key && !descending;
    workData.sort((a, b) =>
      flg ? (a[key] < b[key] ? 1 : -1) : a[key] > b[key] ? 1 : -1
    );
    setData(workData);
    setSortdy(key);
    setDescending(flg);
    _fireDataChange(workData);
  };

  const _showEditor = e => {
    setEdit({
      row: parseInt(e.target.dataset.row, 10),
      key: e.target.dataset.key
    });
  };

  const _save = e => {
    e.preventDefault();
    const value = formInputRef.current.getValue();
    let workData = Array.from(data);
    workData[edit.row][edit.key] = value;
    setEdit(null);
    setData(workData);
    _fireDataChange(workData);
  };

  const _actionClick = (rowidx, action) => {
    setDialog({ type: action, idx: rowidx });
  };

  const _deleteConfirmationClick = action => {
    if (action === "dismiss") {
      _closeDialog();
      return;
    }
    let workData = Array.from(data);
    workData.splice(dialog.idx, 1);
    setDialog(null);
    setData(workData);
    _fireDataChange(workData);
  };

  const _closeDialog = () => {
    setDialog(null);
  };

  const _saveDataDialog = action => {
    if (action === "dismiss") {
      _closeDialog();
      return;
    }
    let targetData = Array.from(data);
    targetData[dialog.idx] = formRef.current.getData();
    setDialog(null);
    setData(targetData);
    _fireDataChange(targetData);
  };

  const _renderDialog = () => {
    if (!dialog) {
      return null;
    }
    switch (dialog.type) {
      case "delete":
        return _renderDeleteDialog();
      case "info":
        return _renderFormDialog(true);
      case "edit":
        return _renderFormDialog();
      default:
        throw Error(`Unexpected dialog type ${dialog.type}`);
    }
  };

  const _renderDeleteDialog = () => {
    const first = data[dialog.idx];
    const nameguess = first[Object.keys(first)[0]];
    return (
      <Dialog
        modal={true}
        header="Confirm deletion"
        confirmLabel="Delete"
        onAction={_deleteConfirmationClick}
      >
        {`Are you sure you want to delete "${nameguess}"?`}
      </Dialog>
    );
  };

  const _renderFormDialog = readonly => {
    return (
      <Dialog
        modal={true}
        header={readonly ? "Item info" : "Edit item"}
        confirmLabel={readonly ? "Ok" : "Save"}
        hasCancel={!readonly}
        onAction={_saveDataDialog}
      >
        <Form
          ref={formRef}
          fields={props.schema}
          initialData={data[dialog.idx]}
          readonly={readonly}
        />
      </Dialog>
    );
  };

  const _renderTable = () => {
    return (
      <table>
        <thead>
          <tr>
            {props.schema.map(item => {
              if (!item.show) {
                return null;
              }
              let title = item.label;
              if (sortby === item.id) {
                title += descending ? " \u2191" : " \u2193";
              }
              return (
                <th
                  className={`schema-${item.id}`}
                  key={item.id}
                  onClick={() => {
                    _sort(item.id);
                  }}
                >
                  {title}
                </th>
              );
            }, this)}
            <th className="ExcelNotSortable">Actions</th>
          </tr>
        </thead>
        <tbody
          onDoubleClick={e => {
            _showEditor(e);
          }}
        >
          {data &&
            data.map((row, rowidx) => {
              return (
                <tr key={rowidx}>
                  {Object.keys(row).map((cell, idx) => {
                    const schema = props.schema[idx];
                    if (!schema || !schema.show) {
                      return null;
                    }
                    const isRating = schema.type === "rating";
                    let content = row[cell];
                    if (
                      !isRating &&
                      edit &&
                      edit.row === rowidx &&
                      edit.key === schema.id
                    ) {
                      content = (
                        <form onSubmit={_save}>
                          <FormInput
                            ref={formInputRef}
                            {...schema}
                            defaultValue={content}
                          />
                        </form>
                      );
                    } else if (isRating) {
                      content = (
                        <Rating
                          readonly={true}
                          defaultValue={Number(content)}
                        />
                      );
                    }
                    return (
                      <td
                        className={classNames({
                          [`schema-${schema.id}`]: true,
                          ExcelEditable: !isRating,
                          ExcelDataLeft: schema.align === "left",
                          ExcelDataRight: schema.align === "right",
                          ExcelDataCenter:
                            schema.align !== "left" && schema.align !== "right"
                        })}
                        key={idx}
                        data-row={rowidx}
                        data-key={schema.id}
                      >
                        {content}
                      </td>
                    );
                  }, this)}
                  <td className="ExcelDataCenter">
                    <Actions onAction={_actionClick.bind(this, rowidx)} />
                  </td>
                </tr>
              );
            }, this)}
        </tbody>
      </table>
    );
  };

  return (
    <div className="Excel">
      {_renderTable()}
      {_renderDialog()}
    </div>
  );
};

Excel.propTypes = {
  schema: PropTypes.arrayOf(PropTypes.object),
  initialData: PropTypes.arrayOf(PropTypes.object),
  onDataChange: PropTypes.func
};

export default Excel;
