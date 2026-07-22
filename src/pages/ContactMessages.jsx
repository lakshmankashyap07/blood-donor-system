import React, { useEffect, useState } from "react";
import {
    getContactMessages,
    deleteContactMessage,
} from "../services/api";
import { toast } from "react-toastify";

function ContactMessages() {
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {
        try {
            const res = await getContactMessages();
            setContacts(res.data.contacts);
        } catch (error) {
            toast.error("Failed to load messages");
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this message?"
        );

        if (!confirmDelete) return;

        try {
            const res = await deleteContactMessage(id);

            toast.success(res.data.message);

            loadMessages();
        } catch (error) {
            toast.error("Delete Failed");
        }
    };

    const filteredContacts = contacts.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.subject.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container-fluid px-2 py-2 contact-messages-page">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <h2 className="fw-bold mb-0">
                    📩 Contact Messages
                </h2>

                <input
                    type="text"
                    className="form-control form-control-sm" placeholder="Search..."
                    style={{ maxWidth: "260px" }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <div className="table-responsive">

                <table className="table table-bordered table-hover table-sm align-middle mb-0">
                    <thead className="table-danger">

                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {filteredContacts.length > 0 ? (
                            filteredContacts.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.subject}</td>
                                    <td>{item.message}</td>
                                    <td>
                                        {new Date(item.createdAt).toLocaleString()}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm px-3" onClick={() =>
                                                handleDelete(item._id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No Messages Found
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>

            </div>
        </div>
    );
}

export default ContactMessages;