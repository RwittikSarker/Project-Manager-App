import "./ChangePassword.css";

const ChangePassword = () => {
  return (
    <div className="change-password" style={{ backgroundImage: `url(${require('../resources/change-password.jpeg')})` }}>
        <div className="chp-container">
          <div className="form-container">
            <h2>Change Password</h2>
            <form>
              <input type="text" placeholder="Current Password*" />
              <input type="password" placeholder="New Password*" />
              <input type="password" placeholder="Repeat Password*" />
              <button className="form-submit">Submit</button>
            </form>
          </div>
        </div>
    </div>
  );
};

export default ChangePassword;
