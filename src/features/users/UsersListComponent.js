import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { useGetUsersQuery } from "./usersApiSlice";
import User from './User';

import CardCounterComponent from '../../components/constant/CardCounterComponent';
import NoContentFoundComponent from '../../components/constant/NoContentFoundComponent';
import LoadingContentComponent from '../../components/constant/LoadingContentComponent';

const UsersListComponent = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('userList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    if (isLoading) return <LoadingContentComponent />;
    if (isError) return <p className="text-center text-red-500">{error?.data?.message}</p>;

    if (isSuccess) {
        const { ids } = users;
        const reversedIds = [...ids].reverse();

        const totalPages = Math.ceil(reversedIds.length / itemsPerPage);
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = reversedIds.slice(indexOfFirstItem, indexOfLastItem);

        const tableContent = currentItems.length
            ? currentItems.map(userId => <User key={userId} userId={userId} />)
            : <NoContentFoundComponent />;

        const paginate = (pageNumber) => setCurrentPage(pageNumber);

        return (
            <div className="flex flex-col">
                <div className='py-4'>
                    <h1 className="text-3xl">List of Employees</h1>
                </div>

                <div className="flex flex-row justify-between gap-4 pb-6 mx-6">
                    <CardCounterComponent
                        type="total"
                        count={ids.length}
                        description="Total members"
                    />
                    <CardCounterComponent
                        type="employeeRole"
                        count={ids.length}
                        description="All active employees"
                    />
                    <CardCounterComponent
                        type="managerRole"
                        count={ids.length}
                        description="All active managers"
                    />
                </div>

                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-600">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Username</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Roles</th>
                                        <th scope="col" className="relative px-6 py-3 text-white">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-800 divide-y divide-gray-200">
                                    {tableContent}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {ids.length > itemsPerPage && (
                    <div className="bg-transparent px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        {/* navigation buttons */}
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Next
                            </button>
                        </div>

                        {/* navigation pages list */}
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-orange-500">
                                    Showing <span className="font-medium text-white">{indexOfFirstItem + 1}</span> to <span className="font-medium text-white">{Math.min(indexOfLastItem, ids.length)}</span> of{' '}
                                    <span className="font-medium text-white">{ids.length}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    <button
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-orange-500 bg-orange-500 text-sm font-medium text-white cursor-pointer"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    {[...Array(totalPages).keys()].map(number => (
                                        <button
                                            key={number + 1}
                                            onClick={() => paginate(number + 1)}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer
                                                ${currentPage === number + 1
                                                    ? 'z-10 bg-orange-900 border-orange-500 text-white'
                                                    : 'bg-gray-800 border-gray-800 text-white'
                                                }`}
                                        >
                                            {number + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-orange-500 bg-orange-500 text-sm font-medium text-white cursor-pointer"
                                    >
                                        <span className="sr-only">Next</span>
                                        <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return <NoContentFoundComponent />;
}

export default UsersListComponent;
