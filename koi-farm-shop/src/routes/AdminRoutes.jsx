import React from 'react';
import {Navigate, Route} from "react-router-dom";
import AdminLayout from "../layout/admin/AdminLayout";
import WelcomeAdmin from "../pages/admin/welcome/WelcomeAdmin";
import OrdersManagement from "../pages/admin/orderManagement/OrdersManagement";
import OrderDetails from "../pages/admin/order-details/OrderDetails";
import AddKoi from "../pages/admin/addProduct/AddKoi";
import AddPackage from "../pages/admin/addProduct/AddPackage";
import UpdateKoi from "../pages/admin/updateProduct/updateKoi";
import DeleteKoi from "../pages/admin/deleteProduct/deleteKoi";
import DeleteKoiPackage from "../pages/admin/deleteProduct/deleteKoiPackage";
import ManagerConsignmentPage from "../pages/admin/consign/AdminConsignment";
import ConsignmentDetail from "../pages/admin/consignment-details/consignmentDetails";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import UpdatePackage from "../pages/admin/updateProduct/updateKoiPackage";
const ProtectedAdminRoute = ({children}) => {
    const role = localStorage.getItem("role");
    if (role !== "Manager") {
        return <Navigate to="/login" replace/>;
    }
    return children;
};

const AdminRoutes = (
    <Route
        path="/admin"
        element={
            <ProtectedAdminRoute>
                <AdminLayout/>
            </ProtectedAdminRoute>
        }
    >
        <Route index element={<WelcomeAdmin/>}/>
        <Route path="manage-orders" element={<OrdersManagement/>}/>
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="manage-orders/:orderId" element={<OrderDetails/>}/>
        <Route path="AddKoi" element={<AddKoi/>}/>
        <Route path="AddPackage" element={<AddPackage/>}/>
        <Route path="updatePackage" element={<UpdatePackage/>}/>
        <Route path="updateKoi" element={<UpdateKoi/>}/>
        <Route path="deleteKoi" element={<DeleteKoi/>}/>
        <Route path="deletePackage" element={<DeleteKoiPackage/>}/>
        <Route path="manage-consign" element={<ManagerConsignmentPage/>}/>
        <Route path="/admin/consign-detail/:id" element={<ConsignmentDetail />} />
    </Route>
);

export default AdminRoutes;