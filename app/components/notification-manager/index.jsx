import React, {PropTypes} from 'react'
import Notification from './notification'

const NotificationManager = ({
    notifications,
    actions
}) => {
    return (
        <div className="t-header__notification-manager u-padding-top-md u-padding-bottom-md u-padding-start u-padding-end">
            {notifications.map((notification) => {
                return <Notification key={notification.id} {...notification} {...actions} />
            })}
        </div>
    )
}

NotificationManager.propTypes = {
    actions: PropTypes.object,
    notifications: PropTypes.array
}

export default NotificationManager
