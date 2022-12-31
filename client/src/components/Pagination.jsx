import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationComp = ({allPages, changePage, page}) => {

    const handleChange = (event, value) => {
        changePage(value);
    }

    return (
        <Stack spacing={2}>
            <Pagination sx={{height: "70px"}} count={allPages.length} page={page} onChange={handleChange} />
        </Stack>
    )
}

export default PaginationComp