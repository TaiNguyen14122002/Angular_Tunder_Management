import { MatPaginatorIntl } from '@angular/material/paginator';

export class MatPaginatorIntlVi extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Số mục trên mỗi trang:';
  override nextPageLabel = 'Trang sau';
  override previousPageLabel = 'Trang trước';
  override firstPageLabel = 'Trang đầu tiên';
  override lastPageLabel = 'Trang cuối cùng';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 của ${length}`;
    }
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} của ${length}`;
  };
}
