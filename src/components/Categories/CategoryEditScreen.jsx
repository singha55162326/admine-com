import React from 'react'
import Header from '../Header';
import Sidebar from '../sidebar';
import EditcategoryMain from './EditcategoryMain';


export const CategoryEditScreen = () => {
  return (
    <>
    <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditcategoryMain/>
      </main>
    </>
  )
}

export default CategoryEditScreen;