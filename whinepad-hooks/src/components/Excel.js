/* @flow */

import * as Immutable from "immutable";
import Actions from "./Actions";
import CRUDActions from "../flux-imm/CRUDActions";
import CRUDStore from "../flux-imm/CRUDStore";
import Dialog from "./Dialog";
import Form from "./Form";
import FormInput from "./FormInput";
import Rating from "./Rating";
import React, { useRef, useState } from "react";
import classNames from "classnames";
import invariant from "invariant";

type EditState = {
  row: number,
  key: string
};

type DialogState = {
  idx: number,
  type: string
};

type Props = {||};

const Excel = (props: Props) => {
  const [data, setData]: Immutable.List<Object> = useState(CRUDStore.getData());
  const [sortby, setSortby]: ?string = useState(null); // schema.id
  const [descending, setDescending]: boolean = useState(false);
  const [edit, setEdit]: EditState = useState(null); // [row index, schema.id],
  const [dialog, setDialog]: DialogState = useState(null); // {type, idx}

  const formRef = useRef();
  const formInputRef = useRef();

  const schema: Array<Object> = CRUDStore.getSchema();

  CRUDStore.addListener("change", () => {
    setData(CRUDStore.getData());
  });

  const _sort = (key: string) => {
    const res = sortby === key && !descending;
    CRUDActions.sort(key, res);
    setSortby(key);
    setDescending(res);
  };

  const _showEditor = (e: Event) => {
    const target = ((e.target: any): HTMLElement);
    setEdit({
      row: parseInt(target.dataset.row, 10),
      key: target.dataset.key
    });
  };

  const _save = (e: Event) => {
    e.preventDefault();
    invariant(edit, "Messed up edit state");
    CRUDActions.updateField(
      edit.row,
      edit.key,
      formInputRef.current.getValue()
    );
    setEdit(null);
  };

  const _actionClick = (rowidx: number, action: string) => {
    console.log("★_actionClick");
    setDialog({ type: action, idx: rowidx });
  };

  const _deleteConfirmationClick = (action: string) => {
    console.log("★_deleteConfirmationClick");
    setDialog(null);
    console.log(action);
    if (action === "dismiss") {
      return;
    }
    const index = dialog && dialog.idx;
    invariant(typeof index === "number", "Unexpected dialog state");
    CRUDActions.delete(index);
  };

  const _saveDataDialog = (action: string) => {
    console.log("★_saveDataDialog");
    setDialog(null);
    if (action === "dismiss") {
      return;
    }
    const index = dialog && dialog.idx;
    invariant(typeof index === "number", "Unexpected dialog state");
    CRUDActions.updateRecord(index, formRef.current.getData());
  };

  const _renderDialog = () => {
    if (!dialog) {
      return null;
    }
    const type = dialog.type;
    switch (type) {
      case "delete":
        return _renderDeleteDialog();
      case "info":
        return _renderFormDialog(true);
      case "edit":
        return _renderFormDialog();
      default:
        throw Error(`Unexpected dialog type ${type}`);
    }
  };

  const _renderDeleteDialog = () => {
    const index = dialog && dialog.idx;
    invariant(typeof index === "number", "Unexpected dialog state");
    const first = data.get(index);
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

  const _renderFormDialog = (readonly: ?boolean) => {
    const index = dialog && dialog.idx;
    invariant(typeof index === "number", "Unexpected dialog state");
    return (
      <Dialog
        modal={true}
        header={readonly ? "Item info" : "Edit item"}
        confirmLabel={readonly ? "Ok" : "Save"}
        hasCancel={!readonly}
        onAction={_saveDataDialog}
      >
        <Form ref={formRef} recordId={index} readonly={readonly} />
      </Dialog>
    );
  };

  const _renderTable = () => {
    return (
      <table>
        <thead>
          <tr>
            {schema.map(item => {
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
                  onClick={_sort.bind(this, item.id)}
                >
                  {title}
                </th>
              );
            }, this)}
            <th className="ExcelNotSortable">操作</th>
          </tr>
        </thead>
        <tbody onDoubleClick={_showEditor}>
          {data &&
            data.map((row, rowidx) => {
              return (
                <tr key={rowidx}>
                  {Object.keys(row).map((cell, idx) => {
                    if (!schema[idx] || !schema[idx].show) {
                      return null;
                    }
                    const isRating = schema[idx].type === "rating";
                    let content = row[cell];
                    if (
                      !isRating &&
                      edit &&
                      edit.row === rowidx &&
                      edit.key === schema[idx].id
                    ) {
                      content = (
                        <form onSubmit={_save}>
                          <FormInput
                            ref={formInputRef}
                            {...schema[idx]}
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
                          [`schema-${schema[idx].id}`]: true,
                          ExcelEditable: !isRating,
                          ExcelDataLeft: schema[idx].align === "left",
                          ExcelDataRight: schema[idx].align === "right",
                          ExcelDataCenter:
                            schema[idx].align !== "left" &&
                            schema[idx].align !== "right"
                        })}
                        key={idx}
                        data-row={rowidx}
                        data-key={schema[idx].id}
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

export default Excel;
