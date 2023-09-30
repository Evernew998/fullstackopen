const Notification = ({ message, messageType }) => {
    if (message === null) {
        return null
    }

    let notificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    if (messageType.toLowerCase() === 'error') {
        notificationStyle.color = 'red'
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification