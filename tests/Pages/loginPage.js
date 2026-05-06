class LoginPage {

  constructor(page) {

    this.page = page;

    this.username = '#user-name';

    this.password = '#password';

    this.loginButton = '#login-button';
  }

  async openWebsite() {

    await this.page.goto('https://www.saucedemo.com/');
  }

  async enterUsername(username) {

    await this.page.fill(this.username, username);
  }

  async enterPassword(password) {

    await this.page.fill(this.password, password);
  }

  async clickLogin() {

    await this.page.click(this.loginButton);
  }
}

module.exports = LoginPage;