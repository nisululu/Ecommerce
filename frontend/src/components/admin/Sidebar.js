import React from 'react'
import { Link } from 'react-router-dom'
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDashcube, faProductHunt } from '@fortawesome/free-brands-svg-icons'
import { faAngleRight, faAngleDown, faCirclePlus, faCartShopping, faUser, faComment, faBoxOpen, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import './Sidebar.css'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Link to="/admin/dashboard">
                <p><FontAwesomeIcon icon={faDashcube} /> Dashboard</p>
            </Link>

            <div className='treeview'>
                <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<FontAwesomeIcon icon={faAngleDown} />}
                    defaultExpandIcon={<FontAwesomeIcon icon={faAngleRight} />}
                >
                    <TreeItem nodeId='1' label="Products">
                        <Link to="/admin/products">
                            <TreeItem nodeId='2' label="All Products" icon={<FontAwesomeIcon icon={faBoxOpen} />} />
                        </Link>

                        <Link to="/admin/product/create">
                            <TreeItem nodeId='3' label="Create" icon={<FontAwesomeIcon icon={faSquarePlus} />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </div>
            <Link to="/admin/orders">
                <p><FontAwesomeIcon icon={faCartShopping} /> Orders</p>
            </Link>
            <Link to="/admin/users">
                <p><FontAwesomeIcon icon={faUser} /> Users</p>
            </Link>
            <Link to="/admin/reviews">
                <p><FontAwesomeIcon icon={faComment} /> Reviews</p>
            </Link>
        </div>
    )
}

export default Sidebar
