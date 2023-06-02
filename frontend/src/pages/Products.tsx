import React, { useState, useEffect } from 'react';
import { Divider, Typography, Grid, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CategoryIcon from '@mui/icons-material/Category';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchBar from '../components/SearchBar';
import NavBar from '../components/NavBar';
import AddProduct from '../forms/AddProduct';
import EditProductDetails from '../forms/EditProductDetails';
import ViewProductDetails from '../forms/ViewProductDetails';
import { ProductDocType as Product } from '../types/product';
import { errorAlert, nonAdminAlert } from '../functions/swalFunctions';
import { ClassificationDocType as Classification } from '../types/classification';
import { ProductProps } from '../props/productProps';
import DeleteProduct from '../forms/DeleteProduct';
import selectAllData, {
  findDataById,
  showClassificationOnProduct,
} from '../rxdb/selectTools';
import ClassificationModal from '../components/ClassificationModal';
import EditProductPrice from '../forms/EditProductPrice';
import EditProductStock from '../forms/EditProductStock';
import responsiveStyles from '../functions/responsive';

export default function Products({ socket }: ProductProps) {
  const styles = responsiveStyles();
  const [open, setOpen] = useState(false);
  const [openEditPrice, setOpenEditPrice] = useState(false);
  const [openEditStock, setOpenEditStock] = useState(false);

  const [openViewDetails, setOpenViewDetails] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openClassification, setOpenClassification] = useState(false);
  const [searchValue, setSearchValue] = useState(''); // Changes: new state for the search value
  const [filteredData, setFilteredData] = useState<Product[]>([]); // Changes: new state for filtered data

  const isAdmin = localStorage.getItem('admin') === 'true';

  const [rowData, setRowData] = useState([
    {
      id: '0',
      name: '',
      storeStock: 0,
      warehouseStock: 0,
      retailPrice: 0,
      wholesalePrice: 0,
      wholesaleAmount: 0,
      lowstockAlert: 0,
      description: '',
      brand: '',
    } as Product,
  ]);
  const [rowProduct, setRowProduct] = useState({} as Product);
  const [rowClassifications, setRowClassifications] = useState(
    [] as Classification[],
  );

  const editHandler = async (
    event: any,
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
    isModalOpen: boolean,
  ) =>
    findDataById(event.id, 'PRODUCT')
      .then((result) => setRowProduct(result! as Product))
      .then(() => showClassificationOnProduct(Number(event.id)))
      .then((e) => {
        if (e) {
          setRowClassifications(e);
        }
      })
      .then(() => modalSetter(!isModalOpen))
      .catch((error) => {
        let errorMessage = 'Unexpected Error';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        errorAlert(errorMessage);
      });

  const deleteHandler = async (event: any) =>
    findDataById(event.id, 'PRODUCT')
      .then((result) => setRowProduct(result! as Product))
      .then(() => setOpenDelete(!openDelete))
      .catch((error) => {
        let errorMessage = 'Unexpected Error';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        errorAlert(errorMessage);
      });

  const columns: GridColDef[] = [
    {
      field: 'view',
      headerName: '',
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      renderCell: (params: any) => (
        <Grid
          container
          sx={{
            justifyContent: 'center',
          }}
        >
          <Button
            startIcon={<VisibilityIcon sx={{ padding: styles.iconPadding }} />}
            variant="outlined"
            color="primary"
            sx={{
              ':hover': {
                backgroundColor: 'rgb(4, 65, 249)',
                color: 'white',
                boxShadow: 6,
              },
              boxShadow: 3,
              borderRadius: 5,
              fontSize: styles.textSize,
              padding: styles.paddingSize,
            }}
            onClick={() => {
              editHandler(params.row, setOpenViewDetails, openViewDetails);
            }}
          >
            View
          </Button>
        </Grid>
      ),
    },
    {
      field: 'name',
      headerName: 'Product Name',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'brand',
      headerName: 'Brand',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
  ];

  const adminColumns: GridColDef[] = [
    {
      field: 'updateButtons',
      headerName: '',
      flex: 1.5,
      sortable: false,
      disableColumnMenu: true,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      renderCell: (params: any) => (
        <Grid
          container
          sx={{
            justifyContent: 'center',
            gap: styles.gapSize,
            flexWrap: styles.stockAndPriceWrap,
            overflow: styles.stockAndPriceOverflow,
          }}
        >
          <Grid item>
            <Button
              startIcon={<EditIcon sx={{ padding: styles.iconPadding }} />}
              variant="outlined"
              color="primary"
              sx={{
                ':hover': {
                  backgroundColor: 'rgb(4, 65, 249)',
                  color: 'white',
                  boxShadow: 6,
                },
                boxShadow: 3,
                borderRadius: 5,
                fontSize: styles.textSize,
                padding: styles.paddingSize,
              }}
              onClick={() => {
                if (isAdmin) {
                  editHandler(params, setOpenEditStock, openEditStock);
                } else {
                  nonAdminAlert();
                }
              }}
            >
              Stocks
            </Button>
          </Grid>
          <Grid item>
            <Button
              startIcon={<EditIcon sx={{ padding: styles.iconPadding }} />}
              variant="outlined"
              color="primary"
              sx={{
                ':hover': {
                  backgroundColor: 'rgb(4, 65, 249)',
                  color: 'white',
                  boxShadow: 6,
                },
                boxShadow: 3,
                borderRadius: 5,
                fontSize: styles.textSize,
                padding: styles.paddingSize,
              }}
              onClick={() => {
                if (isAdmin) {
                  editHandler(params, setOpenEditPrice, openEditPrice);
                } else {
                  nonAdminAlert();
                }
              }}
            >
              Price
            </Button>
          </Grid>
        </Grid>
      ),
    },
    {
      field: 'EditDeleteButtons',
      headerName: '',
      flex: 1.5,
      sortable: false,
      disableColumnMenu: true,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      renderCell: (params: any) => (
        <Grid container sx={{ justifyContent: 'center', gap: styles.gapSize }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              ':hover': {
                backgroundColor: 'rgb(4, 65, 249)',
                color: 'white',
                boxShadow: 6,
              },
              boxShadow: 3,
              borderRadius: 5,
              fontSize: styles.textSize,
              padding: styles.paddingSize,
            }}
            onClick={() => {
              if (isAdmin) {
                editHandler(params, setOpenDetails, openDetails);
              } else {
                nonAdminAlert();
              }
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{
              ':hover': {
                backgroundColor: 'rgb(249, 65, 4)',
                color: 'white',
                boxShadow: 6,
              },
              boxShadow: 3,
              borderRadius: 5,
              fontSize: styles.textSize,
              padding: styles.paddingSize,
            }}
            onClick={() => {
              if (isAdmin) {
                deleteHandler(params);
              } else {
                nonAdminAlert();
              }
            }}
          >
            Delete
          </Button>
        </Grid>
      ),
    },
  ];

  // Changes: Added New Function
  const filterData = (searchInput: string, data: Product[]) => {
    if (!searchInput) {
      setFilteredData(data);
    } else {
      const lowercasedValue = searchInput
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '');
      const filtered = data.filter(
        (item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(lowercasedValue) ||
          item.brand
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(lowercasedValue) ||
          item.description
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(lowercasedValue),
      );
      setFilteredData(filtered);
    }
  };

  const displayData = async () =>
    selectAllData('PRODUCT').then((result) => {
      const products = result as Product[];
      setRowData(products);
      filterData(searchValue, products); // Changes: Call filterData when data changes
    });

  // Changes: Modify useEffect
  useEffect(() => {
    displayData();
  }, [openAdd, openDetails, openDelete, searchValue]); // Changes: Add searchValue to dependencies

  // Changes: Modify socket
  socket.on('connect', () => displayData()).on('update', () => displayData());

  return (
    <Grid container sx={{ position: 'relative', overflow: 'hidden' }}>
      <NavBar isOpen={open} setIsOpen={setOpen} />
      <Grid
        sx={{
          height: '100%',
          width: '85%',
          marginLeft: styles.wholePageMarginLeft(open),
          transition: 'margin-left 0.3s ease',
          mb: 5,
        }}
      >
        <Grid
          container
          sx={{
            justifyContent: 'space-between',
            display: 'flex',
            ml: styles.margLeft,
            mt: 4,
          }}
        >
          <Grid item>
            <Typography fontFamily="Poppins" fontSize={25}>
              Products
            </Typography>
          </Grid>

          <Grid item>
            {isAdmin && (
              <Button
                variant="contained"
                sx={{
                  ':hover': {
                    backgroundColor: 'rgb(4, 65, 249);',
                    color: 'white',
                    boxShadow: 7,
                  },
                  boxShadow: 3,
                  borderRadius: 5,
                }}
                onClick={() => {
                  if (isAdmin) {
                    setOpenAdd(!openAdd);
                  } else {
                    nonAdminAlert();
                  }
                }}
              >
                Add Product
              </Button>
            )}
          </Grid>
        </Grid>
        <Divider sx={{ width: '100vw', my: 3 }} />
        <Grid
          container
          sx={{
            justifyContent: 'space-between',
            display: 'flex',
            ml: styles.margLeft,
            mt: 1,
            mb: 2,
          }}
        >
          <Grid item>
            {isAdmin && (
              <Button
                endIcon={<CategoryIcon />}
                variant="contained"
                sx={{
                  ':hover': {
                    backgroundColor: 'rgb(4, 65, 249);',
                    color: 'white',
                    boxShadow: 7,
                  },
                  boxShadow: 3,
                  borderRadius: 5,
                }}
                onClick={() => {
                  if (isAdmin) {
                    setOpenClassification(!openClassification);
                  } else {
                    nonAdminAlert();
                  }
                }}
              >
                Manage Classifications
              </Button>
            )}
          </Grid>

          <Grid item>
            <SearchBar
              placeholder="Search Products"
              searchFunction={(searchInput: string) => {
                // Changes: Modified Search Bar Component
                setSearchValue(searchInput.trim()); // Changes: Trim searchInput here too
                filterData(searchInput.trim(), rowData);
              }}
            />
          </Grid>
        </Grid>
        <DataGrid
          sx={{
            height: '70vh',
            width: '85vw',
            justifyContent: 'flex-start',
            ml: styles.margLeft,
            ':hover': { backgroundColor: 'transparent' },
            '& .customHeader': {
              backgroundColor: '#1976d2',
              color: 'white',
              fontSize: 'larger',
              fontWeight: 'bold',
            },
          }}
          hideFooterSelectedRowCount
          // disableSelectionOnClick
          // disableCellClick
          // Changes: changed rows={rowData} to rows={filteredData}
          rows={filteredData}
          columns={isAdmin ? [...columns, ...adminColumns] : columns}
          rowsPerPageOptions={[10]}
          pageSize={10}
          localeText={{ noRowsLabel: 'No Products Found' }}
        />

        {openDetails && ( // addresses issue #37
          <EditProductDetails
            product={rowProduct}
            classifications={rowClassifications}
            closeHandler={() => {
              setOpenDetails(false);
            }}
            isOpen={openDetails}
          />
        )}
        {openViewDetails && ( // addresses issue #37
          <ViewProductDetails
            product={rowProduct}
            classifications={rowClassifications}
            closeHandler={() => {
              setOpenViewDetails(false);
            }}
            isOpen={openViewDetails}
          />
        )}
        {openAdd && (
          <AddProduct
            closeHandler={() => {
              setOpenAdd(false);
            }}
            isOpen={openAdd}
          />
        )}
        {openEditPrice && (
          <EditProductPrice
            product={rowProduct}
            closeHandler={() => {
              setOpenEditPrice(false);
            }}
            isOpen={openEditPrice}
          />
        )}
        {openEditStock && (
          <EditProductStock
            product={rowProduct}
            closeHandler={() => {
              setOpenEditStock(false);
            }}
            isOpen={openEditStock}
          />
        )}
        {openDelete && (
          <DeleteProduct
            product={rowProduct}
            closeHandler={() => {
              setOpenDelete(false);
            }}
            isOpen={openDelete}
          />
        )}
        {openClassification && (
          <ClassificationModal
            isOpen={openClassification}
            closeHandler={() => {
              setOpenClassification(false);
            }}
          />
        )}
      </Grid>
    </Grid>
  );
}
