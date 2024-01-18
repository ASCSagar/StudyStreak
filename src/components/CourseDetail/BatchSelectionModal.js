import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ajaxCall from "../../helpers/ajaxCall";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BatchSelection = (props) => {
  const [batches, setBatches] = useState([]);
  const [selectedBatchIds, setSelectedBatchIds] = useState([]);
  const authData = useSelector((state) => state.authStore);
  const navigate = useNavigate();

  const {
    // handleEnrollNow,
    packageId,
    show,
    onHide,
    batchFormSubmitting,
    courseName,
    packageName,
    packagePrice,
  } = props;

  const getCourseBatches = async () => {
    try {
      const response = await ajaxCall(
        `/filterbatches/${packageId}/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        },
        8000
      );
      if (response.status === 200) {
        setBatches(response.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getCourseBatches();
  }, [packageId]);

  const handleEnrollButton = () => {
    if (!authData.loggedIn) {
      navigate("/login");
      return;
    }
    // handleEnrollNow(packageId, selectedBatchIds);
    navigate("/checkout", {
      state: {
        packageId,
        selectedBatchIds,
        courseName,
        packageName,
        packagePrice,
      },
    });
  };

  const handleModalClose = () => {
    setSelectedBatchIds('');
    onHide();
  };

  return (
    <Modal
      {...props}
      show={show}
      size='lg'
      keyboard={false}
      backdrop='static'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          Select Preferred Batch
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {batches?.length >= 1 ? (
          <div className='row'>
            {batches?.map((batchItem) => (
              <div
                className='dashboard__recent__course__single'
                key={batchItem?.id}
              >
                <div className='me-3'>
                  <input
                    type='checkbox'
                    checked={selectedBatchIds.includes(batchItem?.id)}
                    name='batchSelection'
                    className='w-10 batch__radio__input'
                    onChange={() => {
                      const batchId = batchItem?.id;
                      setSelectedBatchIds((prev) => {
                        if (prev.includes(batchId)) {
                          return prev.filter((id) => id !== batchId);
                        } else {
                          return [...prev, batchId];
                        }
                      });
                    }}
                  />
                </div>
                <div
                  className='dashboard__recent__course__content'
                  style={{ width: '80%' }}
                >
                  <div className='dashboard__recent__course__heading'>
                    <h3>{batchItem?.batch_name}</h3>
                  </div>
                  <div className='dashboard__recent__course__meta text-xl-center'>
                    <ul className='ps-0'>
                      <li>
                        <i className='icofont-calendar'></i> <b>Date</b>:{' '}
                        {batchItem?.batch_startdate && batchItem?.batch_enddate
                          ? `${batchItem?.batch_startdate} To ${batchItem?.batch_enddate}`
                          : 'N/A'}
                      </li>
                      <li>
                        <i className='icofont-clock-time'></i> <b>Time</b>:{' '}
                        {batchItem?.batch_start_timing &&
                        batchItem?.batch_end_timing
                          ? `${batchItem?.batch_start_timing} To ${batchItem?.batch_end_timing}`
                          : 'N/A'}
                      </li>

                      <li>
                        <i className='icofont-group-students'></i>{' '}
                        <b>Students</b>: {batchItem?.batchuser}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No Batches Available</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button
          className='default__button'
          onClick={() => handleEnrollButton()}
          disabled={!selectedBatchIds || batchFormSubmitting}
        >
          {batchFormSubmitting && (
            <Spinner
              animation='border'
              role='status'
              size='sm'
              className='me-2'
            >
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
          )}
          Enroll Package
        </button>
        <button
          onClick={() => handleModalClose()}
          className='btn-secondary default__button'
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default BatchSelection;
