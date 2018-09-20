import React from 'react';
import PropTypes from 'prop-types';

export class ServiceWorkerNotifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = { notifications: [] };
  }

  componentDidMount() {
    if (typeof window !== 'undefined' && 'serviceWorker' in window.navigator) {
      // Handler for messages coming from the service worker
      window.navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('listener', event);
        // `event` is of type MessageEvent, https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent
        // To access the serialized object being sent from our service worker,
        // use `event.data`.
        if (event.data.type === 'layout-service-cache-updated') {
          this.addNotification({
            message: (
              <div>
                The content for this route has been updated.
                <a onClick={this.reloadContent} href="#">
                  click here
                </a>
                to load the new content.
              </div>
            ),
          });
        }
      });
    }
  }

  reloadContent = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  addNotification = (notification) => {
    this.setState((prevState) => {
      return { notifications: [...prevState.notifications, notification] };
    });
  };

  removeNotification = (notificationIndex) => {
    this.setState((prevState) => {
      return {
        notifications: prevState.notifications.filter((_, index) => index !== notificationIndex),
      };
    });
  };

  render() {
    return (
      <div className={this.props.className}>
        {this.state.notifications.map((notification, index) => (
          <div
            className={`alert alert-${notification.type || 'primary'} alert-dismissable`}
            role="alert"
            key={`notification${index}`}
          >
            {notification.message}
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={() => this.removeNotification(index)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        ))}
      </div>
    );
  }
}

ServiceWorkerNotifications.propTypes = {
  className: PropTypes.string,
};
