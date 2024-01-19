import { MatSnackBar } from '@angular/material/snack-bar';

export function activateNotifications(
  textOne: string,
  horizontalPosition: any,
  verticalPosition: any,
  snackBar: MatSnackBar
) {
  snackBar.open(textOne, '', {
    horizontalPosition: horizontalPosition,
    verticalPosition: verticalPosition,
    duration: 3000,
  });
}
