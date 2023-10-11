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

// Pasindu********************************************************
import AllSalesReps from "./pages/AllSalesReps";
import CreateSalesRep from "./pages/CreateRep";
import EditDelivery from "./pages/EditSalesRep";
import AllSchedules from "./pages/AllSchedules";
import CreateSchedule from "./pages/CreateSchedule";
import EditSchedule from "./pages/EditSchedule";
import CreateDeliveryReport from "./pages/CreateDeliveryReport";

// Pasindu********************************************************

// Yasitha********************************************************
import CreateStock from "./pages/CreateStock";
import AllStock from "./pages/AllStocks";
import CreateCategory from "./pages/CreateCategory";
import AllCategory from "./pages/AllCategories";
import EditStock from "./pages/EditStock";
import EditCategory from "./pages/EditCategory";
import AddProfit from "./pages/AddProfit";
import AllProfit from "./pages/AllProfits";
import EditProfit from "./pages/EditProfit";
import StockReport from "./pages/CreateReportStock";
import IMDashboard from "./pages/IMDashboard";

// Yasitha********************************************************

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

                {/* Pasindu******************************************************** */}
                <Route path="/allsalesreps" element={<AllSalesReps />} />
                <Route path="/createsalesrep" element={<CreateSalesRep />} />
                <Route path="/editsalerep/:id" element={<EditDelivery />} />
                <Route path="/myschedules" element={<AllSchedules />} />
                <Route path="/createschedule" element={<CreateSchedule />} />
                <Route path="/editschedule/:id" element={<EditSchedule />} />
                <Route
                  path="/createdeliveryreport"
                  element={<CreateDeliveryReport />}
                />

                {/* Pasindu******************************************************** */}

                {/* Yasitha******************************************************** */}
                <Route path="/createcategory" element={<CreateCategory />} />
                <Route path="/mycategories" element={<AllCategory />} />
                <Route path="/createstock" element={<CreateStock />} />
                <Route path="/mystocks" element={<AllStock />} />
                <Route path="/editstock/:id" element={<EditStock />} />
                <Route path="/editcategory/:id" element={<EditCategory />} />
                <Route path="/addprofit" element={<AddProfit />} />
                <Route path="/myprofits" element={<AllProfit />} />
                <Route path="/editprofit/:id" element={<EditProfit />} />
                <Route path="/stockreport" element={<StockReport />} />
                <Route path="/imdashboard" element={<IMDashboard />} />

                {/* Yasitha******************************************************** */}
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
