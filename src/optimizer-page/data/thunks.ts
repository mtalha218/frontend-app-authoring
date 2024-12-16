import { RequestStatus } from '../../data/constants';
import {
  LINK_CHECK_FAILURE_STATUSES,
  LINK_CHECK_IN_PROGRESS_STATUSES,
  SCAN_STAGES,
} from './constants';

import { postLinkCheck, getLinkCheckStatus } from './api';
import {
  updateLinkCheckInProgress,
  updateLinkCheckResult,
  updateCurrentStage,
  updateError,
  updateIsErrorModalOpen,
  updateLoadingStatus,
  updateSavingStatus,
} from './slice';

export function startLinkCheck(courseId: string) {
  return async (dispatch) => {
    dispatch(updateSavingStatus({ status: RequestStatus.PENDING }));
    dispatch(updateLinkCheckInProgress(true));
    dispatch(updateCurrentStage(1));
    try {
      // dispatch(reset());
      const data = await postLinkCheck(courseId);
      dispatch(updateCurrentStage(data.linkCheckStatus));
      // setExportCookie(moment().valueOf(), exportData.exportStatus === EXPORT_STAGES.SUCCESS);

      dispatch(updateSavingStatus({ status: RequestStatus.SUCCESSFUL }));
      return true;
    } catch (error) {
      dispatch(updateSavingStatus({ status: RequestStatus.FAILED }));
      dispatch(updateLinkCheckInProgress(false));
      return false;
    }
  };
}

// TODO: use new statuses
export function fetchLinkCheckStatus(courseId) {
  return async (dispatch) => {
    dispatch(updateLoadingStatus({ status: RequestStatus.IN_PROGRESS }));

    /* ****** Debugging ******** */
    // dispatch(updateLinkCheckInProgress(true));
    // dispatch(updateCurrentStage(3));
    // return true;

    try {
      const { linkCheckStatus, linkCheckOutput } = await getLinkCheckStatus(
        courseId,
      );
      if (LINK_CHECK_IN_PROGRESS_STATUSES.includes(linkCheckStatus)) {
        dispatch(updateLinkCheckInProgress(true));
      } else {
        dispatch(updateLinkCheckInProgress(false));
      }

      dispatch(updateCurrentStage(SCAN_STAGES[linkCheckStatus]));

      if (
        linkCheckStatus === undefined
        || linkCheckStatus === null
        || LINK_CHECK_FAILURE_STATUSES.includes(linkCheckStatus)
      ) {
        dispatch(updateError({ msg: 'Link Check Failed' }));
        dispatch(updateIsErrorModalOpen(true));
      }

      if (linkCheckOutput) {
        dispatch(updateLinkCheckResult(linkCheckOutput));
      }

      dispatch(updateLoadingStatus({ status: RequestStatus.SUCCESSFUL }));
      return true;
    } catch (error: any) {
      if (error?.response && error?.response.status === 403) {
        dispatch(updateLoadingStatus({ status: RequestStatus.DENIED }));
      } else {
        dispatch(
          updateLoadingStatus({ courseId, status: RequestStatus.FAILED }),
        );
      }
      return false;
    }
  };
}
