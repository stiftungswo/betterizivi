import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, Route } from 'react-router-dom';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import Collapse from 'reactstrap/lib/Collapse';
import Nav from 'reactstrap/lib/Nav';
import Navbar from 'reactstrap/lib/Navbar';
import NavbarBrand from 'reactstrap/lib/NavbarBrand';
import NavbarToggler from 'reactstrap/lib/NavbarToggler';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';
import { ApiStore } from '../stores/apiStore';
import { MainStore, messages } from '../stores/mainStore';
import { Locale } from '../types';

interface NavEntryProps {
  to: string;
  children: React.ReactNode;
  exact?: boolean;
}

const NavEntry = ({ to, children, exact }: NavEntryProps) => (
  <Route
    path={to}
    exact={exact}
    children={({ match }) => (
      <NavItem active={Boolean(match)}>
        <Link className="nav-link" to={to}>
          {children}
        </Link>
      </NavItem>
    )}
  />
);

interface NavProps {
  mainStore?: MainStore;
  apiStore?: ApiStore;
}

const feedbacksUrl = 'FEEDBACKS_URL';

@inject('mainStore', 'apiStore')
@observer
export class Navigation extends React.Component<NavProps> {
  handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    this.props.apiStore!.logout();
  }

  render() {
    const mainStore = this.props.mainStore!;
    const apiStore = this.props.apiStore!;
    const feedbacksUrlValid = feedbacksUrl.startsWith('https');

    return (
      <Navbar color={'light'} light expand={'md'}>
        <NavbarBrand href={'/'}>iZivi</NavbarBrand>
        <NavbarToggler onClick={() => (mainStore.navOpen = !mainStore.navOpen)} />
        <Collapse isOpen={mainStore.navOpen} navbar>
          <Nav className={'ml-auto'} navbar>
            {apiStore.isLoggedIn ? (
              <>
                {apiStore.isAdmin && (
                  <>
                    <NavEntry to="/users">
                      <FormattedMessage id="izivi.frontend.layout.navigation.employee_list" defaultMessage="Mitarbeiterliste" />
                    </NavEntry>
                    <NavEntry to="/phones">
                      <FormattedMessage id="izivi.frontend.layout.navigation.phone_list" defaultMessage="Telefonliste" />
                    </NavEntry>
                    <NavEntry to="/service_specifications">
                      <FormattedMessage id="izivi.frontend.layout.navigation.service_specifications" defaultMessage="Pflichtenheft" />
                    </NavEntry>
                    <NavEntry to="/holidays">
                      <FormattedMessage id="izivi.frontend.layout.navigation.holidays" defaultMessage="Freitage" />
                    </NavEntry>
                    {feedbacksUrlValid && (<NavEntry to={'/feedbacks'}>
                      <FormattedMessage id="izivi.frontend.layout.navigation.feedback" defaultMessage="Einsatz Feedback" />
                    </NavEntry>)}
                    <NavEntry to="/services">
                      <FormattedMessage id="izivi.frontend.layout.navigation.planning" defaultMessage="Planung" />
                    </NavEntry>
                    <NavEntry to="/expense_sheets">
                      <FormattedMessage id="izivi.frontend.layout.navigation.expenses" defaultMessage="Spesen" />
                    </NavEntry>
                    <NavEntry to={'/payments'}>
                      <FormattedMessage id="izivi.frontend.layout.navigation.payments" defaultMessage="Auszahlungen" />
                    </NavEntry>
                  </>
                )}
                <NavEntry to="/profile">
                  <FormattedMessage id="izivi.frontend.layout.navigation.profile" defaultMessage="Profil" />
                </NavEntry>
                <NavEntry to="/changePassword">
                  <FormattedMessage id="izivi.frontend.layout.navigation.change_password" defaultMessage="Passwort ändern" />
                </NavEntry>
                <NavItem>
                  <NavLink href="/logout" onClick={this.handleLogout}>
                    <FormattedMessage id="izivi.frontend.layout.navigation.logout" defaultMessage="Abmelden" />
                  </NavLink>
                </NavItem>
              </>
            ) : (
                <>
                  <NavEntry to="/register/1">
                    <FormattedMessage id="izivi.frontend.layout.navigation.register" defaultMessage="Registrieren" />
                  </NavEntry>
                  <NavEntry to="/login">
                    <FormattedMessage id="izivi.frontend.layout.navigation.login" defaultMessage="Anmelden" />
                  </NavEntry>
                </>
              )}
            <UncontrolledDropdown>
              <DropdownToggle>
                {mainStore.locale}
              </DropdownToggle>
              <DropdownMenu right>
                {Object.keys(messages).map((locale) =>
                  <DropdownItem onClick={() => mainStore.locale = locale as Locale} key={locale}>
                    {locale}
                  </DropdownItem>,
                )}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
