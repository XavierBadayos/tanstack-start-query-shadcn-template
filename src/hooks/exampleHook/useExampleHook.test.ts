import { act, renderHook } from "@testing-library/react"
import { usePagination } from "./useExampleHook";


describe('usePagination', () => {
    const standardMockData = Array.from({ length: 25 }, (_, i) => ({ name: `item-${i}` }));

    test('page initializes to 1', () => {
        const {result} = renderHook(() => usePagination(standardMockData, 10));
        expect(result.current.page).toBe(1);
    })

    test('returns pageCount of 5 for 25 items with 5 itemsPerPage', () => {
        const {result} = renderHook(() => usePagination(standardMockData, 5));
        expect(result.current.pageCount).toBe(5);
    })

    test('returns pageCount of 3 for 30 items with 12 itemsPerPage', () => {
        const mockData = Array.from({ length: 30 }, (_, i) => ({ name: `item-${i}` }));
        const {result} = renderHook(() => usePagination(mockData, 12));
        expect(result.current.pageCount).toBe(3);
    })

    test('returns page 2 when nextPage is called when page is 1 and there are 2 or more pages', () => {
        const {result} = renderHook(() => usePagination(standardMockData, 5));
        act(() => {
            result.current.nextPage();
        });
        expect(result.current.page).toBe(2);
    })

    test('returns page 1 when page is 2 and prevPage is called', () => {
        const {result} = renderHook(() => usePagination(standardMockData, 5));
        act(() => {
            result.current.nextPage();
            result.current.prevPage();
        });
        expect(result.current.page).toBe(1);
    })

    test('page does not increase past pageCount', () => {
        const {result} = renderHook(() => usePagination(standardMockData, 10));
        act(() => {
            result.current.nextPage();
            result.current.nextPage();
            result.current.nextPage();
            result.current.nextPage();
        });
        expect(result.current.page).toBe(3);
    })

    test('page does not decrease past 1', () => {
        const {result} = renderHook(() => usePagination(standardMockData, 10));
        act(() => {
            result.current.prevPage();
            result.current.prevPage();
        });
        expect(result.current.page).toBe(1);
    })

    test('return items for page 1', () => {
        const {result} = renderHook(() => usePagination(standardMockData, 10));
        expect(result.current.paginatedData).toStrictEqual(standardMockData.slice(0, 10))
    })

    test('return items for page 3', () => {
        const {result} = renderHook(() => usePagination(standardMockData, 10));
         act(() => {
            result.current.nextPage();
            result.current.nextPage();
            result.current.nextPage();

        });
        expect(result.current.paginatedData).toStrictEqual(standardMockData.slice(20, 30))
    })
    
    test('return empty array when data is an empty array', () => {
        const {result} = renderHook(() => usePagination([], 10));
        expect(result.current.paginatedData).toStrictEqual([])
    })

    test('return empty array when data is not an array', () => {
        const notAnArrayString = "notAnArray" as unknown  as [];
        const {result} = renderHook(() => usePagination(notAnArrayString, 10));
        expect(result.current.paginatedData).toStrictEqual([])
    })
    
    test('return page is 0 when data is empty and nextPage is called', () => {
        const {result} = renderHook(() => usePagination([], 10));
        act(() => {
            result.current.nextPage()
        })
        expect(result.current.page).toBe(0);
    })

    test('return empty array when itemsPerPage is 0', () => {
        const {result} = renderHook(() => usePagination(standardMockData, 0));
        expect(result.current.paginatedData).toStrictEqual([])
    })

    test('return pageCount is 1 when itemsPerPage is not a number', () => {
        const {result} = renderHook(() => usePagination(standardMockData, "NaN" as unknown as number));
        expect(result.current.pageCount).toBe(25)
    })

    test('adjusts page to pageCount if data shrinks and current page no longer exists', () => {
    const { result, rerender } = renderHook(
        ({ data, perPage }) => usePagination(data, perPage),
        {
            initialProps: { data: standardMockData, perPage: 10 }
        }
    );
    act(() => {
        result.current.nextPage();
        result.current.nextPage();
    });
    expect(result.current.page).toBe(3);
    rerender({ data: standardMockData.slice(0, 5), perPage: 10 });
    expect(result.current.page).toBe(1)});

    test('return correct page when goToPage is called', () => {
        const {result} = renderHook(() => usePagination(standardMockData, 5));
        act(() => {
            result.current.goToPage(3)
        })
        expect(result.current.page).toBe(3)
        
        act(() => {
            result.current.goToPage(-10)
        })
        expect(result.current.page).toBe(1)

         act(() => {
            result.current.goToPage(100000)
        })
        expect(result.current.page).toBe(5)
    })
})