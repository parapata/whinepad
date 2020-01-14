import Button from "./Button";
import Dialog from "./Dialog";
import Excel from "./Excel";
import Form from "./Form";
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

const Whinepad = props => {
  const [data, setData] = useState(props.initialData);
  const [addnew, setAddnew] = useState(false);
  const [preSearchData, setPreSearchData] = useState();

  const formRef = useRef();

  const _addNewDialog = () => {
    setAddnew(true);
  };

  const _addNew = action => {
    if (action === "dismiss") {
      setAddnew(false);
      return;
    }
    let workData = Array.from(data);
    workData.unshift(formRef.current.getData());
    setAddnew(false);
    setData(workData);
    _commitToStorage(workData);
  };

  const _onExcelDataChange = newData => {
    setData(newData);
    _commitToStorage(newData);
  };

  const _commitToStorage = data => {
    localStorage.setItem("data", JSON.stringify(data));
  };

  const _startSearching = () => {
    setPreSearchData(data);
  };

  const _doneSearching = () => {
    setData(preSearchData);
  };

  const _search = e => {
    const needle = e.target.value.toLowerCase();
    if (!needle) {
      setData(preSearchData);
      return;
    }
    const fields = props.schema.map(item => item.id);
    const searchdata = preSearchData.filter(row => {
      for (let f = 0; f < fields.length; f++) {
        if (
          row[fields[f]]
            .toString()
            .toLowerCase()
            .indexOf(needle) > -1
        ) {
          return true;
        }
      }
      return false;
    });
    setData(searchdata);
  };

  return (
    <div className="Whinepad">
      <div className="WhinepadToolbar">
        <div className="WhinepadToolbarAdd">
          <Button onClick={_addNewDialog} className="WhinepadToolbarAddButton">
            + add
          </Button>
        </div>
        <div className="WhinepadToolbarSearch">
          <input
            placeholder="Search..."
            onChange={_search}
            onFocus={_startSearching}
            onBlur={_doneSearching}
          />
        </div>
      </div>
      <div className="WhinepadDatagrid">
        <Excel
          schema={props.schema}
          initialData={data}
          onDataChange={_onExcelDataChange}
        />
      </div>
      {addnew ? (
        <Dialog
          modal={true}
          header="Add new item"
          confirmLabel="Add"
          onAction={_addNew}
        >
          <Form ref={formRef} fields={props.schema} />
        </Dialog>
      ) : null}
    </div>
  );
};

Whinepad.propTypes = {
  schema: PropTypes.arrayOf(PropTypes.object),
  initialData: PropTypes.arrayOf(PropTypes.object)
};

export default Whinepad;
