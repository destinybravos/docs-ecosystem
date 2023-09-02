import React from 'react'
import PageHeader from '@/Components/PageHeader';

const BaseLayout = ({auth, children}) => {
  return (
    <section>
        <PageHeader user={auth.user} />

        <main>
            { children }
        </main>
    </section>
  )
}

export default BaseLayout