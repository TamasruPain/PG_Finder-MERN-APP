import React from 'react'
import { FloatButton } from 'antd';

const FloatingUpButton = () => {
    return (
        <div>
            <FloatButton.Group
                shape="circle"
                style={{
                    right: 24,
                }}
            >
                <FloatButton.BackTop visibilityHeight={0} />
            </FloatButton.Group>
        </div>
    )
}

export default FloatingUpButton
