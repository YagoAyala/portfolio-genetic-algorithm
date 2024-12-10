import React from "react";

const List = ({
  list,
}) => {
  const renderList = () => {
    return list.map((obj, index) => (
      <div key={`${Math.random()}_${index}`}>
        <div key={Math.random()} className={"bet-header"}>
          <p className={"date-generated"}>
            Gerado em: {obj.date}
          </p>
          <p className={"uuid"}>{obj.uuid}</p>
        </div>
        {
          obj.list.map((innerList, index) => (
            <div className={"bet"} key={index}>
              {innerList.map((number, innerIndex) => (
                <p key={innerIndex}>{number}</p>
              ))}
            </div>
          ))
        }
      </div>
    ));
  };

  return (
    <span className="list">
      {renderList()}
    </span>
  );
};

export default List;
