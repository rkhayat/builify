import Actions from './constants';
import { addNotification } from './notifications';
import { closeModal } from './dialog';

function getExtension (filename) {
  return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
}

export function uploadFile (file) {
  return (dispatch) => {
    const extension = getExtension(file.fileName);

    if (extension !== undefined) {
      switch (extension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
          dispatch({
            type: Actions.UPLOAD_FILE,
            file: file
          });

          break;

        default:
          dispatch(closeModal());
          dispatch(addNotification({
            message: 'File type is not supported.',
            level: 'info'
          }));

          break;
      }
    }
  };
}

export function selectImageFile (file) {
  return {
    type: Actions.SELECT_IMAGE_FILE,
    file: file
  };
}

export function deleteAllAssets () {
  return {
    type: Actions.DELETE_ALL_ASSETS
  };
}
