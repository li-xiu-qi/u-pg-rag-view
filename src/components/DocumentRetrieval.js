import React, {useState} from 'react';
import ReactPaginate from 'react-paginate';

// 初始分页数量
const INITIAL_PAGE_SIZE = 2;

const DocumentRetrieval = ({documents}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(INITIAL_PAGE_SIZE);
    const [tempPageSize, setTempPageSize] = useState(INITIAL_PAGE_SIZE); // 临时分页数量

    // 计算当前页的起始索引和结束索引
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, documents.length);

    // 获取当前页的文档列表
    const currentDocuments = documents.slice(startIndex, endIndex);

    // 处理页码变化
    const handlePageChange = ({selected}) => {
        setCurrentPage(selected + 1);
    };

    // 处理临时分页数量变化
    const handleTempPageSizeChange = (event) => {
        const newSize = Math.max(Number(event.target.value), 1); // 确保至少为1
        setTempPageSize(newSize);
    };

    // 确认新的分页数量
    const confirmPageSizeChange = () => {
        setPageSize(tempPageSize);
        setCurrentPage(1); // 重置到第一页
    };

    const totalPages = Math.ceil(documents.length / pageSize);

    return (
        <div className="right-sidebar">
            <div className="pagination">
                <label>
                    每页文档数量:
                    <input
                        type="number"
                        value={tempPageSize}
                        onChange={handleTempPageSizeChange}
                        min="1"
                    />
                </label>
                <button onClick={confirmPageSizeChange}>确认</button>
                <div>
                    <span>总页数: {totalPages}</span>
                </div>
                <ReactPaginate
                    pageCount={totalPages}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    previousLabel={'上一页'}
                    nextLabel={'下一页'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageClassName={'page'}
                    previousClassName={'previous'}
                    nextClassName={'next'}
                />
            </div>
            <h3>检索到的文档</h3>
            <ul>
                {currentDocuments.map((doc, index) => (
                    <li key={index}>
                        <p>{doc.page_content}</p>
                        {doc.image_paths && doc.image_paths.length > 0 && (
                            <div className="carousel">
                                {doc.image_paths.map((imageUrl) => (
                                    <img key={imageUrl} src={imageUrl} alt={`Document ${index}`}/>
                                ))}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DocumentRetrieval;