import { useEffect, useState } from "react";

export function usePagination<T>(data: T[], itemsPerPage: number) {
    const safeData = !Array.isArray(data) ? [] : data;
    const safeItemsPerPage = typeof(itemsPerPage) !== "number" ? 1 : itemsPerPage;    
    const pageCount = safeItemsPerPage > 0 ? Math.ceil(safeData.length / safeItemsPerPage) : 1;   
    const [page, setPage] = useState(1)
    const paginatedData = safeData.slice((page - 1) * safeItemsPerPage, page * safeItemsPerPage)

    useEffect(() => {
        if (page > pageCount) {
            setPage(pageCount);
        }
    }, [pageCount, page]);

    const goToPage = (targetPage: number) => {
        const clampedPage = Math.min(pageCount, Math.max(1, targetPage));
        setPage(clampedPage);
    }

    const nextPage = () => {
        setPage(prev => Math.min(prev + 1, pageCount));        
    }
    
    const prevPage = () => {
        setPage(prev => Math.max(prev - 1, 1));
    }
    
    return {page, pageCount, goToPage, nextPage, prevPage, paginatedData};
}