import React, { useEffect, useState } from "react";
import {
    getUsers,
    deleteUser,
    updateUserRole,
} from "../services/api";
import { toast } from "react-toastify";
function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const res = await getUsers();
            setUsers(res.data.users);
        } catch (error) {
            toast.error("Failed to load users");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?"))
            return;

        try {
            const res = await deleteUser(id);
            toast.success(res.data.message);
            loadUsers();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Delete failed"
            );
        }
    };

    const handleRole = async (id, currentRole) => {
        const newRole =
            currentRole === "admin" ? "user" : "admin";

        try {
            const res = await updateUserRole(id, newRole);
            toast.success(res.data.message);
            loadUsers();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Role update failed"
            );
        }
    };

    // Search

    const filteredUsers = users.filter((user) => {
        const searchText = search.toLowerCase();

        return (
            user.name.toLowerCase().includes(searchText) ||
            user.email.toLowerCase().includes(searchText) ||
            user.city.toLowerCase().includes(searchText) ||
            user.bloodGroup.toLowerCase().includes(searchText)
        );
    });

    // Pagination

    const indexOfLastUser = currentPage * usersPerPage;

    const indexOfFirstUser =
        indexOfLastUser - usersPerPage;

    const currentUsers = filteredUsers.slice(
        indexOfFirstUser,
        indexOfLastUser
    );

    const totalPages = Math.ceil(
        filteredUsers.length / usersPerPage
    );

    const paginate = (pageNumber) =>
        setCurrentPage(pageNumber);
    return (
        <div className="container-fluid px-2 py-2 manage-users-page">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <h2 className="fw-bold mb-0">
                    👥 Manage Users
                </h2>
                <input
                    type="text"
                    className="form-control form-control-sm mt-2 mt-md-0"
                    style={{ maxWidth: "260px" }}
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                />

            </div>

            <div className="table-responsive">

                <table className="table table-bordered table-hover table-sm align-middle mb-0">
                    <thead className="table-danger">

                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Blood Group</th>
                            <th>City</th>
                            <th>Role</th>
                            <th>Donor</th>
                            <th>Available</th>
                            <th>Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        {currentUsers.length > 0 ? (

                            currentUsers.map((user, index) => (

                                <tr key={user._id}>

                                    <td>{indexOfFirstUser + index + 1}</td>

                                    <td>{user.name}</td>

                                    <td>{user.email}</td>

                                    <td>{user.bloodGroup}</td>

                                    <td>{user.city}</td>

                                    <td>
                                        <span
                                            className={`badge ${user.role === "admin"
                                                ? "bg-danger"
                                                : "bg-secondary"
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>

                                    <td>
                                        {user.isDonor ? (
                                            <span className="badge bg-success">
                                                Yes
                                            </span>
                                        ) : (
                                            <span className="badge bg-warning text-dark">
                                                No
                                            </span>
                                        )}
                                    </td>

                                    <td>
                                        {user.available ? (
                                            <span className="badge bg-success">
                                                Available
                                            </span>
                                        ) : (
                                            <span className="badge bg-danger">
                                                Unavailable
                                            </span>
                                        )}
                                    </td>

                                    <td>

                                        {loggedInUser?.id !== user._id ? (

                                            <>

                                                <button
                                                    className="btn btn-warning btn-sm me-1" onClick={() =>
                                                        handleRole(user._id, user.role)
                                                    }
                                                >
                                                    {user.role === "admin"
                                                        ? "Make User"
                                                        : "Make Admin"}
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        handleDelete(user._id)
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </>

                                        ) : (

                                            <span className="text-muted">
                                                Current User
                                            </span>

                                        )}

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td colSpan="9" className="text-center">
                                    No Users Found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

            {/* Pagination */}

            {filteredUsers.length > usersPerPage && (

                <div className="d-flex justify-content-between align-items-center flex-wrap mt-2">
                    <p className="mb-2">
                        Showing{" "}
                        <strong>
                            {indexOfFirstUser + 1}
                        </strong>
                        {" - "}
                        <strong>
                            {Math.min(indexOfLastUser, filteredUsers.length)}
                        </strong>
                        {" of "}
                        <strong>{filteredUsers.length}</strong> Users
                    </p>

                    <nav>

                        <ul className="pagination mb-0">

                            <li
                                className={`page-item ${currentPage === 1 ? "disabled" : ""
                                    }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() =>
                                        setCurrentPage(currentPage - 1)
                                    }
                                >
                                    Previous
                                </button>
                            </li>

                            {Array.from(
                                { length: totalPages },
                                (_, i) => (
                                    <li
                                        key={i}
                                        className={`page-item ${currentPage === i + 1
                                            ? "active"
                                            : ""
                                            }`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() =>
                                                paginate(i + 1)
                                            }
                                        >
                                            {i + 1}
                                        </button>
                                    </li>
                                )
                            )}

                            <li
                                className={`page-item ${currentPage === totalPages
                                    ? "disabled"
                                    : ""
                                    }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() =>
                                        setCurrentPage(currentPage + 1)
                                    }
                                >
                                    Next
                                </button>
                            </li>

                        </ul>

                    </nav>

                </div>

            )}

        </div>
    );
}

export default ManageUsers;