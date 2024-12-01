/** Icons are imported separatly to reduce build time */
import {IconData} from "../utils/icon";

export interface Route {
  path: string;
  icon: any; // icon component
  name: string;
  submenu?: Route[];
}

const routes: Route[] = [
  {
    path: '/dashboard',
    icon: IconData.DashboardIcon,
    name: 'Dashboard',
  },
  {
    path: '/user-management',
    icon: IconData.UserIcon,
    name: 'User Management',
  },
  {
    path: '/store-management',
    icon: IconData.StoreIcon,
    name: 'Store Management',
  },
  {
    path: '/customer',
    icon: IconData.CustomerIcon,
    name: 'Data Pelanggan',
  },
  {
    path: '/product',
    icon: IconData.ProductIcon,
    name: 'Data Produk',
  },
  {
    path: '',
    icon: IconData.NoteIcon,
    name: 'Catatan',
    submenu: [
      {
        path: '/note-debt',
        icon: IconData.DebtIcon,
        name: 'Hutang'
      },
      {
        path: '/note-incomeExpense',
        icon: IconData.DebtIcon,
        name: 'Pemasukkan & Pengeluaran'
      },
      {
        path: '/note-other',
        name: 'Lainya',
        icon: IconData.BlankIcon
      }
    ]
  },
  {
    path: '',
    icon: IconData.TransactionIcon,
    name: 'Transaksi',
    submenu: [
      {
        path: '/transaction-purchase',
        icon: IconData.MoneyIcon,
        name: 'Penjualan'
      },
      {
        path: '/transaction-history',
        icon: IconData.HistoryIcon,
        name: 'Riwayat Penjualan'
      }
    ]
  },
  {
    path: '',
    icon: IconData.AdjustmentIcon,
    name: 'Master Data',
    submenu: [
      {
        path: '/master-category',
        icon: IconData.DebtIcon,
        name: 'Category'
      },
      {
        path: '/master-unit',
        icon: IconData.HistoryIcon,
        name: 'ProductList Unit'
      }
    ]
  }
];

export const routeSuperAdmin: Route[] = [
  {
    path: '/user-management',
    icon: IconData.UserIcon,
    name: 'User Management',
  },
  {
    path: '/store-management',
    icon: IconData.StoreIcon,
    name: 'Store Management',
  },
  {
    path: '',
    icon: IconData.AdjustmentIcon,
    name: 'Master Data',
    submenu: [
      {
        path: '/master-category',
        icon: IconData.DebtIcon,
        name: 'Category'
      },
      {
        path: '/master-unit',
        icon: IconData.HistoryIcon,
        name: 'ProductList Unit'
      }
    ]
  }
];

export const routeOwner: Route[] = [
  {
    path: '/dashboard',
    icon: IconData.DashboardIcon,
    name: 'Dashboard',
  },
  {
    path: '/user-management',
    icon: IconData.UserIcon,
    name: 'User Management',
  },
  {
    path: '/customer',
    icon: IconData.CustomerIcon,
    name: 'Data Pelanggan',
  },
  {
    path: '/product',
    icon: IconData.ProductIcon,
    name: 'Data Produk',
  },
  {
    path: '',
    icon: IconData.NoteIcon,
    name: 'Catatan',
    submenu: [
      {
        path: '/note-debt',
        icon: IconData.DebtIcon,
        name: 'Hutang'
      },
      {
        path: '/note-incomeExpense',
        icon: IconData.DebtIcon,
        name: 'Pemasukkan & Pengeluaran'
      },
      {
        path: '/note-other',
        name: 'Lainya',
        icon: IconData.BlankIcon
      }
    ]
  },
  {
    path: '',
    icon: IconData.TransactionIcon,
    name: 'Transaksi',
    submenu: [
      {
        path: '/transaction-purchase',
        icon: IconData.MoneyIcon,
        name: 'Pembelian'
      },
      {
        path: '/transaction-history',
        icon: IconData.HistoryIcon,
        name: 'Riwayat Pembelian'
      }
    ]
  }
];

export const routeAdmin: Route[] = [
  {
    path: '/dashboard',
    icon: IconData.DashboardIcon,
    name: 'Dashboard',
  },
  {
    path: '/customer',
    icon: IconData.CustomerIcon,
    name: 'Data Pelanggan',
  },
  {
    path: '/product',
    icon: IconData.ProductIcon,
    name: 'Data Produk',
  },
  {
    path: '',
    icon: IconData.NoteIcon,
    name: 'Catatan',
    submenu: [
      {
        path: '/note-debt',
        icon: IconData.DebtIcon,
        name: 'Hutang'
      },
      {
        path: '/note-incomeExpense',
        icon: IconData.DebtIcon,
        name: 'Pemasukkan & Pengeluaran'
      },
      {
        path: '/note-other',
        name: 'Lainya',
        icon: IconData.BlankIcon
      }
    ]
  },
  {
    path: '',
    icon: IconData.TransactionIcon,
    name: 'Transaksi',
    submenu: [
      {
        path: '/transaction-purchase',
        icon: IconData.MoneyIcon,
        name: 'Pembelian'
      },
      {
        path: '/transaction-history',
        icon: IconData.HistoryIcon,
        name: 'Riwayat Pembelian'
      }
    ]
  },
  // {
  //   path: '',
  //   icon: IconData.AdjustmentIcon,
  //   name: 'Master Data',
  //   submenu: [
  //     {
  //       path: '/master-category',
  //       icon: IconData.DebtIcon,
  //       name: 'Category'
  //     },
  //     {
  //       path: '/master-unit',
  //       icon: IconData.HistoryIcon,
  //       name: 'ProductList Unit'
  //     }
  //   ]
  // }
];
export default routes


