import { Routes as Switch, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout";

import { AuthContextProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContextProvider } from "./context/ToastContext";
import CreateEmployee from "./pages/CreateEmployee";
import AllEmployee from "./pages/AllEmployees";
import EditEmployee from "./pages/EditEmployee";
import CreateSalary from "./pages/AddSalary";
import CreateAttendance from "./pages/AddAttendance";
import Report from "./pages/CreateReport";
import Index from "./pages";
import Footer from "./components/Footer";
import Header from "./components/Header";

import { CreateDraftOrder } from "./pages/CreateDraftOrder";
import { AddProduct } from "./pages/AddProduct";
import { ApproveOrder } from "./pages/ApproveOrder";
import { OrderDetails } from "./pages/OrderDetails";
import { DraftOrderList } from "./pages/DraftOrderList";
import { OrderList } from "./pages/OrderList";
import { SupplierProductList } from "./pages/SupplierProductList";
import { SupplierSideProductList } from "./pages/SupplierSideProductList";
import { SupplierOrderList } from "./pages/SupplierOrderList";
import { AddMaterials } from "./pages/AddMaterials";
import { UpdateMaterials } from "./pages/UpdateMaterials";
import { PlacedRejectOrder } from "./pages/PlacedRejectOrder";
import { OrderListViewStaff } from "./pages/OrderListViewStaff";
import { ApproveOrderStaff } from "./pages/ApproveOrderStaff";
import { AllSites } from "pages/AllSites";
import { AddSite } from "./pages/AddSite";
import { ReceiptList } from "./pages/ReceiptList";
import { AddReceipt } from "./pages/AddReceipt";
import { AddInvoice } from "./pages/AddInvoice";
import { InquiryManager } from "./pages/InquiryManager";
import { EditSite } from "pages/EditSite";
import { AllInvoices } from "pages/AllInvoices";
import { AllReceipts } from "pages/AllReceipts";

const App = () => {
  return (
    <Router>
      <div style={{ minHeight: "90vh", margin: "0px", padding: "0px" }}>
        <ToastContextProvider>
          <AuthContextProvider>
            <Header />
            <Layout>
              <Switch>
                <Route path="/" element={<Home />} />
                <Route path="/index" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/createemp" element={<CreateEmployee />} />
                <Route path="/myemployees" element={<AllEmployee />} />
                <Route path="/editemp/:id" element={<EditEmployee />} />
                <Route path="/addsalary" element={<CreateSalary />} />
                <Route path="/addattendance" element={<CreateAttendance />} />
                <Route path="/createreport" element={<Report />} />

                {/* Site Manager UI */}
                <Route path="/adddraft" exact element={<CreateDraftOrder />} />
                <Route path="/addproduct" exact element={<AddProduct />} />
                <Route
                  path="/orderlist/approveorder/:id"
                  exact
                  element={<ApproveOrder />}
                />
                <Route path="/orderdetails" exact element={<OrderDetails />} />
                <Route
                  path="/draftorderlist"
                  exact
                  element={<DraftOrderList />}
                />
                <Route path="/orderlist" exact element={<OrderList />} />
                <Route
                  path="/supplierproductlist"
                  exact
                  element={<SupplierProductList />}
                />
                <Route
                  path="/inquirymanager"
                  exact
                  element={<InquiryManager />}
                />

                {/* Supplier UI */}
                <Route
                  path="/suppliersideproductlist"
                  exact
                  element={<SupplierSideProductList />}
                />
                <Route
                  path="/supplierorderlist"
                  exact
                  element={<SupplierOrderList />}
                />
                <Route path="/addmaterial" exact element={<AddMaterials />} />
                <Route
                  path="/updatematerial"
                  exact
                  element={<UpdateMaterials />}
                />
                <Route
                  path="/placedrejectorder"
                  exact
                  element={<PlacedRejectOrder />}
                />

                {/* Staff UI */}
                <Route
                  path="/orderlistviewstaff"
                  exact
                  element={<OrderListViewStaff />}
                />
                <Route path="/editsite/:id" element={<EditSite />} />
                <Route
                  path="/orderlistviewstaff/approveorderstaff/:id"
                  exact
                  element={<ApproveOrderStaff />}
                />
                <Route path="/allsites" exact element={<AllSites />} />
                <Route path="/addsite" exact element={<AddSite />} />
                <Route
                  path="/updatestaff"
                  exact
                  element={<ApproveOrderStaff />}
                />
                <Route path="/allreceipts" exact element={<AllReceipts />} />
                <Route path="/addreceipt" exact element={<AddReceipt />} />
                <Route path="/allinvoices" exact element={<AllInvoices />} />
                <Route path="/addinvoice" exact element={<AddInvoice />} />
              </Switch>
            </Layout>
          </AuthContextProvider>
        </ToastContextProvider>
      </div>
      <div>
        <Footer />
      </div>
    </Router>
  );
};
export default App;
