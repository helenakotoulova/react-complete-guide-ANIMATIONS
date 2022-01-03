import React from 'react';

import './Backdrop.css';

const backdrop = (props) => {
    const cssClasses = ['Backdrop', props.show? 'BackdropOpen' : 'BackdropClosed'];
    // takhle to vzdy bude Backdrop class, ale nekdy se k tomu jeste prida BackdropOPen nebo BackdropClosed. spoji se to pomoci join(' ') - pozn. je dulezite tam dat tu mezeru
    return <div className={cssClasses.join(' ')}></div>
};

export default backdrop;