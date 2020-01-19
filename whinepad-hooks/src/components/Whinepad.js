/* @flow */

import Button from "./Button";
import CRUDActions from "../flux-imm/CRUDActions";
import CRUDStore from "../flux-imm/CRUDStore";
import Dialog from "./Dialog";
import Excel from "./Excel";
import Form from "./Form";
import React, { useEffect, useRef, useState } from "react";

const Whinepad = () => {
  const [count, setCount]: number = useState(CRUDStore.getCount());
  const [addnew, setAddnew]: boolean = useState(false);

  const formRef = useRef();

  CRUDStore.addListener("change", () => {
    setCount(CRUDStore.getCount());
  });

  useEffect(() => {}, [addnew, count]);

  const _addNewDialog = () => {
    setAddnew(true);
  };

  const _addNew = (action: string) => {
    setAddnew(false);
    if (action === "confirm") {
      CRUDActions.create(formRef.current.getData());
    }
  };

  return (
    <div className="Whinepad">
      <div className="WhinepadToolbar">
        <div className="WhinepadToolbarAdd">
          <Button onClick={_addNewDialog} className="WhinepadToolbarAddButton">
            + 追加
          </Button>
        </div>
        <div className="WhinepadToolbarSearch">
          <input
            placeholder={`${count}件から検索...`}
            onChange={CRUDActions.search.bind(CRUDActions)}
            onFocus={CRUDActions.startSearching.bind(CRUDActions)}
          />
        </div>
      </div>
      <div className="WhinepadDatagrid">
        <Excel />
      </div>
      {addnew ? (
        <Dialog
          modal={true}
          header="Add new item"
          confirmLabel="Add"
          onAction={_addNew}
        >
          <Form ref={formRef} />
        </Dialog>
      ) : null}
    </div>
  );
};

export default Whinepad;
