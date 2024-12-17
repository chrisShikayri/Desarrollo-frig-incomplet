import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmacionComponent } from '../modal-confirmation/modal-confirmation.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  users: User[] = [];
  isLoggedIn = false;

  displayedColumns: string[] = ['name', 'email', 'phone', 'address', 'actions'];
  dataSource: MatTableDataSource<User> | undefined;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      this.users = this.userService.getUsers();
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
    } else {
      this.router.navigate(['/login']);
    }
  }

  deleteUser(id: number): void {
    const dialogRef = this.dialog.open(ModalConfirmacionComponent);

    dialogRef.afterClosed().subscribe((resultado: boolean) => {
      if (resultado) {
        this.userService.deleteUser(id);
        this.users = this.userService.getUsers();
        this.dataSource = new MatTableDataSource<User>(this.users);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    if (this.paginator) {
      this.paginator.pageIndex = this.pageIndex;
      this.paginator.pageSize = this.pageSize;
    }
  }
}
