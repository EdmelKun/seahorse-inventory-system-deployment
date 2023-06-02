import Swal from 'sweetalert2';

const renderBlueButton = () => {
  const confirmButton = Swal.getConfirmButton();
  if (confirmButton) {
    confirmButton.style.backgroundColor = '#1976d2';
    confirmButton.style.color = 'white';
    confirmButton.style.transition =
      'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease';
    confirmButton.style.boxShadow = '0 2px 5px 0 rgba(0, 0, 0, 0.26)';
    confirmButton.addEventListener('mouseenter', () => {
      confirmButton.style.backgroundColor = 'rgb(4, 65, 249)';
      confirmButton.style.color = 'white';
      confirmButton.style.boxShadow = '0 6px 10px 0 rgba(0, 0, 0, 0.3)';
    });
    confirmButton.addEventListener('mouseleave', () => {
      confirmButton.style.backgroundColor = '#1976d2';
      confirmButton.style.color = 'white';
      confirmButton.style.boxShadow = '0 2px 5px 0 rgba(0, 0, 0, 0.26)';
    });
  }
};

const renderRedButton = () => {
  const confirmButton = Swal.getConfirmButton();
  if (confirmButton) {
    confirmButton.style.backgroundColor = '#d32f2f';
    confirmButton.style.color = 'white';
    confirmButton.style.transition =
      'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease';
    confirmButton.style.boxShadow = '0 2px 5px 0 rgba(0, 0, 0, 0.26)';
    confirmButton.addEventListener('mouseenter', () => {
      confirmButton.style.backgroundColor = 'rgb(249, 65, 4)';
      confirmButton.style.color = 'white';
      confirmButton.style.boxShadow = '0 6px 10px 0 rgba(0, 0, 0, 0.3)';
    });
    confirmButton.addEventListener('mouseleave', () => {
      confirmButton.style.backgroundColor = '#d32f2f';
      confirmButton.style.color = 'white';
      confirmButton.style.boxShadow = '0 2px 5px 0 rgba(0, 0, 0, 0.26)';
    });
  }
};

export function successAlert() {
  Swal.fire({
    icon: 'success',
    title: 'OK',
    text: 'SUCCESS',
    didRender: renderBlueButton,
  });
}

export function errorAlert(err: string) {
  Swal.fire({
    icon: 'error',
    title: 'OOPS',
    text: err,
    didRender: renderRedButton,
  });
}

export function addSuccessAlert() {
  Swal.fire({
    icon: 'success',
    title: 'OK',
    text: 'DATA ADDED SUCCESSFULLY',
    didRender: renderBlueButton,
  });
}

export function editSuccessAlert() {
  Swal.fire({
    icon: 'success',
    title: 'OK',
    text: 'DATA EDITED SUCCESSFULLY',
    didRender: renderBlueButton,
  });
}

export function deleteSuccessAlert() {
  Swal.fire({
    icon: 'success',
    title: 'OK',
    text: 'DATA DELETED SUCCESSFULLY',
    didRender: renderBlueButton,
  });
}

export function fieldErrorAlert() {
  Swal.fire({
    icon: 'error',
    title: 'OOPS',
    text: 'MISSING/WRONG INPUT',
    didRender: renderRedButton,
  });
}

export function nonMasterRedirectAlert(customFunc: Function) {
  Swal.fire({
    icon: 'error',
    title: 'UNAUTHORIZED',
    text: 'Only the Master Admin may access the page!',
    didRender: renderRedButton,
    didClose: () => {
      customFunc();
    },
  });
}

export function nonAdminAlert() {
  Swal.fire({
    icon: 'error',
    title: 'UNAUTHORIZED',
    text: 'Only Admins can use this feature!',
    didRender: renderRedButton,
  });
}
