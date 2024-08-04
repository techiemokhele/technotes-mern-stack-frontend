import React, { useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import { useGetNotesQuery } from './notesApiSlice'
import Note from './Note'
import useAuth from '../../hooks/useAuth'

import CardCounterComponent from '../../components/constant/CardCounterComponent'
import LoadingContentComponent from '../../components/constant/LoadingContentComponent'
import NoContentFoundComponent from '../../components/constant/NoContentFoundComponent'

const NotesListComponent = () => {
    const { username, isManager, isAdmin } = useAuth()
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 8

    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery('notesList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const {
        totalNotes,
        openNotes,
        completedNotes,
        currentItems,
        totalPages,
        indexOfFirstItem,
        indexOfLastItem
    } = useMemo(() => {
        if (isSuccess) {
            const { ids, entities } = notes

            // Filter notes based on user role
            let filteredIds
            if (isManager || isAdmin) {
                filteredIds = [...ids]
            } else {
                filteredIds = ids.filter(noteId => entities[noteId].username === username)
            }

            // Reverse order to display newest notes first
            filteredIds.reverse()

            // Calculate note counts
            let open = 0
            let completed = 0
            filteredIds.forEach(id => {
                if (entities[id].completed) {
                    completed++
                } else {
                    open++
                }
            })

            // Pagination calculations
            const totalNotes = filteredIds.length
            const totalPages = Math.ceil(totalNotes / itemsPerPage)
            const indexOfLastItem = currentPage * itemsPerPage
            const indexOfFirstItem = indexOfLastItem - itemsPerPage
            const currentItems = filteredIds.slice(indexOfFirstItem, indexOfLastItem)

            return {
                totalNotes,
                openNotes: open,
                completedNotes: completed,
                currentItems,
                totalPages,
                indexOfFirstItem,
                indexOfLastItem
            }
        }
        return { totalNotes: 0, openNotes: 0, completedNotes: 0, currentItems: [], totalPages: 0, indexOfFirstItem: 0, indexOfLastItem: 0 }
    }, [isSuccess, notes, isManager, isAdmin, username, currentPage])

    if (isLoading) return <LoadingContentComponent />
    if (isError) return <p className='text-center text-red-500'>{error?.data?.message}</p>

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className='flex flex-col mx-auto container'>
            <div className='py-4'>
                <h1 className='text-3xl'>List of Notes</h1>
            </div>

            <div className='grid grid-cols-3 gap-2 pb-6'>
                <CardCounterComponent
                    type='total'
                    count={totalNotes}
                    description='Total number of all notes'
                />
                <CardCounterComponent
                    type='statusOpen'
                    count={openNotes}
                    description='All active notes'
                />
                <CardCounterComponent
                    type='statusComplete'
                    count={completedNotes}
                    description='All completed notes'
                />
            </div>

            <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                    <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                        {currentItems.length > 0 ? (
                            <table className='min-w-full divide-y divide-gray-200'>
                                <thead className='bg-gray-600'>
                                    <tr>
                                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Status</th>
                                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Created</th>
                                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Updated</th>
                                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Title</th>
                                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Owner</th>
                                        <th scope='col' className='relative px-6 py-3'>
                                            <span className='sr-only'>Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='bg-gray-800 divide-y divide-gray-200'>
                                    {currentItems.map(noteId => <Note key={noteId} noteId={noteId} />)}
                                </tbody>
                            </table>
                        ) : (
                            <NoContentFoundComponent />
                        )}
                    </div>
                </div>
            </div>

            {totalNotes > itemsPerPage && (
                <div className='px-4 pt-6 pb-3 flex items-center justify-between sm:px-6'>
                    <div className='flex-1 flex justify-between sm:hidden'>
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
                        >
                            Next
                        </button>
                    </div>

                    <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
                        <div>
                            <p className='text-sm text-orange-500'>
                                Showing <span className='font-medium text-white'>{Math.min(indexOfFirstItem + 1, totalNotes)}</span> to
                                <span className='font-medium text-white'> {Math.min(indexOfLastItem, totalNotes)}</span> of{' '}
                                <span className='font-medium text-white'>{totalNotes}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px' aria-label='Pagination'>
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-orange-500 bg-orange-500 text-sm font-medium text-white hover:bg-orange-800'
                                >
                                    <span className='sr-only'>Previous</span>
                                    <FontAwesomeIcon icon={faChevronLeft} className='h-5 w-5' aria-hidden='true' />
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
                                    className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-orange-500 bg-orange-500 text-sm font-medium text-white hover:bg-orange-800'
                                >
                                    <span className='sr-only'>Next</span>
                                    <FontAwesomeIcon icon={faChevronRight} className='h-5 w-5' aria-hidden='true' />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NotesListComponent
