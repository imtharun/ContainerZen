import React from "react";

const T = ({
  search,
  headers,
  rows,
  isChecked,
  isCheckedHandler,
  filter,
  forWhat,
}) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 no-scrollbar">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  {headers.map((ele, index) => {
                    return (
                      <th key={index + 1} scope="col" className="px-6 py-4">
                        {ele}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {search === "" ? (
                  rows.map((row, index) => {
                    return (
                      <tr
                        key={index + 1}
                        className="border-b dark:border-neutral-500"
                      >
                        <Template
                          forWhat={forWhat}
                          isCheckedHandler={isCheckedHandler}
                          isChecked={isChecked}
                          index={index}
                          row={row}
                        />
                      </tr>
                    );
                  })
                ) : rows.filter((row) => row[filter]?.includes(search))
                    .length !== 0 ? (
                  rows
                    .filter((row) => row[filter]?.includes(search))
                    .map((row, index) => {
                      return (
                        <tr
                          key={index + 1}
                          className="border-b dark:border-neutral-500"
                        >
                          <Template
                            forWhat={forWhat}
                            isCheckedHandler={isCheckedHandler}
                            isChecked={isChecked}
                            index={index}
                            row={row}
                          />
                        </tr>
                      );
                    })
                ) : (
                  <tr>
                    <td className="text-center p-4" colSpan="6">
                      No results found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const Template = ({ index, row, isChecked, forWhat, isCheckedHandler }) => {
  return (
    <>
      {row.col1 && (
        <td className="whitespace-nowrap px-6 py-4 text-center">
          <input
            className="w-3 h-3"
            type="checkbox"
            name={row.col1}
            id={index}
            value={row.col1}
            checked={isChecked.has(row.col1)}
            onChange={() => isCheckedHandler(row.col1)}
          />
        </td>
      )}
      {row.col1 && (
        <td className="whitespace-nowrap px-6 py-4">
          {forWhat === "container" ? row.col1.slice(1) : row.col1}
        </td>
      )}
      {row.col2 && <td className="whitespace-nowrap px-6 py-4">{row.col2}</td>}
      {row.col3 && (
        <td className="whitespace-nowrap px-6 py-4">
          {forWhat === "image"
            ? "" + new Date(+row.col3 * 1000).toDateString()
            : row.col3}
        </td>
      )}

      {row.col4 && (
        <td className="whitespace-nowrap px-6 py-4">
          {forWhat === "volume" ? row.col4.slice(0, 10) : row.col4}
        </td>
      )}
      {row.col5 && <td className="whitespace-nowrap px-6 py-4">{row.col5}</td>}
      {row.col6 && (
        <td className="whitespace-nowrap px-6 py-4">
          {forWhat === "container"
            ? "" + new Date(+row.col6 * 1000).toDateString()
            : row.col6}
        </td>
      )}
    </>
  );
};

export default T;
