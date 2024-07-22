import React, { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";
import CardCounterComponent from '../../components/constant/CardCounterComponent';
import LoadingContentComponent from '../../components/constant/LoadingContentComponent';

const NoContentFoundComponent = () => (
    <div className="text-center py-4">
        <h2 className="text-2xl text-red-500">No Content Found</h2>
    </div>
);

const NotesListComponent = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery();

    const { totalNotes, openNotes, completedNotes } = useMemo(() => {
        if (isSuccess) {
            const { ids, entities } = notes;
            let open = 0;
            let completed = 0;
            ids.forEach(id => {
                if (entities[id].completed) {
                    completed++;
                } else {
                    open++;
                }
            });
            return {
                totalNotes: ids.length,
                openNotes: open,
                completedNotes: completed
            };
        }
        return { totalNotes: 0, openNotes: 0, completedNotes: 0 };
    }, [isSuccess, notes]);

    if (isLoading) return <LoadingContentComponent />;
    if (isError) return <p className="text-center text-red-500">{error?.data?.message}</p>;

    if (isSuccess) {
        const { ids } = notes;
        const totalPages = Math.ceil(ids.length / itemsPerPage);
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = ids.slice(indexOfFirstItem, indexOfLastItem);

        const tableContent = currentItems.length
            ? currentItems.map(noteId => <Note key={noteId} noteId={noteId} />)
            : <NoContentFoundComponent />;

        const paginate = (pageNumber) => setCurrentPage(pageNumber);

        return (
            <div className="flex flex-col container mx-auto max-w-full">
                <div className='py-4'>
                    <h1 className="text-3xl">List of Notes</h1>
                </div>

                <div className="grid grid-cols-3 gap-2 pb-6">
                    <CardCounterComponent
                        type="total"
                        count={totalNotes}
                        description="Total number of all notes"
                    />
                    <CardCounterComponent
                        type="statusOpen"
                        count={openNotes}
                        description="All active notes"
                    />
                    <CardCounterComponent
                        type="statusComplete"
                        count={completedNotes}
                        description="All completed notes"
                    />
                </div>

                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-600">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Created</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Updated</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Title</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Owner</th>
                                        <th scope="col" className="relative px-6 py-3">
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
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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

                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">{Math.min(indexOfLastItem, ids.length)}</span> of{' '}
                                    <span className="font-medium">{ids.length}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    <button
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
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
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
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

export default NotesListComponent;
