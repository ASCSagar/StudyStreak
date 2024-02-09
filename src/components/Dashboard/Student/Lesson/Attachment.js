import React from "react";

const Attachment = ({ activeLesson }) => {
  return (
    <div>
      {activeLesson && activeLesson.length > 0 && (
        <>
          <div className="lesson__content__wrap">
            <h3>Attachment</h3>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="dashboard__table table-responsive">
                <table style={{ marginTop: "70px" }}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeLesson?.map(
                      ({ id, attachment_description, attachment }, index) => (
                        <tr
                          key={id}
                          className={`${
                            index % 2 === 0 ? "" : "dashboard__table__row"
                          }`}
                        >
                          <th>
                            <span>{attachment_description}</span>
                            <p className="mt-2"></p>
                          </th>
                          <td></td>
                          <td></td>
                          <td style={{ width: "0%" }}>
                            <div className="dashboard__button__group">
                              <a
                                className="dashboard__small__btn__2"
                                href={attachment}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <i className="icofont-download" />
                                Download
                              </a>
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Attachment;
