import Inferno from 'inferno';
import { Link } from 'inferno-router';
import Card from '../tags/card';
import axios from 'axios';
import Component from 'inferno-component';
import ApiService from '../../utils/api';
import LoadingView from '../tags/loading-view';
import Header from '../tags/header';

export default class EditExpense extends Component {
  constructor(props) {
    super(props);

    this.state = {
      report_sheet: null,
    };
  }

  componentDidMount() {
    this.getReportSheet();
  }

  getReportSheet() {
    this.setState({ loading: true, error: null });
    axios
      .get(ApiService.BASE_URL + 'reportsheet/' + this.props.params.report_sheet_id, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('jwtToken') },
      })
      .then(response => {
        this.setState({
          report_sheet: response.data,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({ error: error });
      });
  }

  showPDF() {
    this.setState({ loading: true, error: null });
    axios
      .get(ApiService.BASE_URL + 'pdf/zivireportsheet?reportSheetId=' + this.props.params.report_sheet_id, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('jwtToken') },
        responseType: 'blob',
      })
      .then(response => {
        this.setState({
          loading: false,
        });
        let blob = new Blob([response.data], { type: 'application/pdf' });
        window.location = window.URL.createObjectURL(blob);
      })
      .catch(error => {
        this.setState({ error: error });
      });
  }

  render() {
    var content = [];
    var sheet = this.state.report_sheet;

    if (sheet != null) {
      content.push(
        <form action="/editSpesenrapport.php?id=208" method="post" enctype="multipart/form-data">
          <div>
            <h1>
              Spesenrapport erstellen für {sheet.first_name} {sheet.last_name}
            </h1>
          </div>
          <table border="0" cellspacing="0" cellpadding="4" class="table">
            <tbody>
              <tr>
                <td class="todd">Pflichtenheft</td>
                <td class="todd">
                  {sheet.pflichtenheft_id} {sheet.pflichtenheft_name}
                </td>
                <td class="todd">&nbsp;</td>
                <td class="todd">&nbsp;</td>
                <td class="todd">&nbsp;</td>
                <td class="todd">&nbsp;</td>
              </tr>
              <tr>
                <td class="teven">Beginn Einsatz</td>
                <td class="teven">&nbsp;</td>
                <td class="teven">&nbsp;</td>
                <td class="teven" align="right">
                  {sheet.einsaetze_start}
                </td>
                <td class="teven">&nbsp;</td>
                <td class="teven">&nbsp;</td>
              </tr>
              <tr>
                <td class="teven">Ende Einsatz</td>
                <td class="teven">&nbsp;</td>
                <td class="teven">&nbsp;</td>
                <td class="teven" align="right">
                  {sheet.einsaetze_end}
                </td>
                <td class="teven">&nbsp;</td>
                <td class="teven">&nbsp;</td>
              </tr>
              <tr>
                <td class="teven">Ferienanspruch für Einsatz</td>
                <td class="teven">&nbsp;</td>
                <td class="teven">&nbsp;</td>
                <td class="teven" align="right">
                  {sheet.einsaetze_eligibleholiday}
                </td>
                <td class="teven">&nbsp;</td>
                <td class="teven">&nbsp;</td>
              </tr>
              <tr>
                <td class="todd">Beginn Meldeblattperiode</td>
                <td class="todd">&nbsp;</td>
                <td class="todd">&nbsp;</td>
                <td class="todd" align="right">
                  {sheet.meldeblaetter_start}
                </td>
                <td class="todd">&nbsp;</td>
                <td class="todd">&nbsp;</td>
              </tr>
              <tr>
                <td class="teven">Ende Meldeblattperiode</td>
                <td class="teven">&nbsp;</td>
                <td class="teven">&nbsp;</td>
                <td class="teven" align="right">
                  {sheet.meldeblaetter_end}
                </td>
                <td class="teven">&nbsp;</td>
                <td class="teven">&nbsp;</td>
              </tr>
              <tr>
                <td class="todd">Dauer</td>
                <td class="todd">&nbsp;</td>
                <td class="todd">&nbsp;</td>
                <td class="todd" align="right">
                  {sheet.sum_tage} Tage
                </td>
                <td class="todd">&nbsp;</td>
                <td class="todd">&nbsp;</td>
              </tr>
              <tr>
                <td class="teven">Arbeit</td>
                <td class="teven">&nbsp;</td>
                <td class="teven">{sheet.meldeblaetter_workdays_proposal} Tage</td>
                <td class="teven" align="right">
                  <input type="text" name="fArbeit" value={sheet.meldeblaetter_workdays} size="2" /> Tage
                </td>
                <td class="teven">&nbsp;</td>
                <td class="teven" align="left">
                  Bemerkungen: <input type="text" name="fArbeitcomment" value={sheet.meldeblaetter_work_comment} size="45" />
                </td>
              </tr>
              <tr>
                <td class="todd">Arbeitsfrei</td>
                <td class="todd">&nbsp;</td>
                <td class="todd">{sheet.meldeblaetter_workfreedays_proposal} Tage</td>
                <td class="todd" align="right">
                  <input type="text" name="fArbeitsfrei" value={sheet.meldeblaetter_workfreedays} size="2" /> Tage
                </td>
                <td class="todd">&nbsp;</td>
                <td class="todd" align="left">
                  Bemerkungen: <input type="text" name="fArbeitsfreicomment" value={sheet.meldeblaetter_workfree_comment} size="45" />
                </td>
              </tr>
              <tr>
                <td class="teven">Betriebsferien (Urlaub)</td>
                <td class="teven">&nbsp;</td>
                <td class="teven">{sheet.meldeblaetter_companyurlaub_proposal} Tage</td>
                <td class="teven" align="right">
                  <input type="text" name="fBetriebsferienurlaub" value={sheet.meldeblaetter_companyurlaub} size="2" /> Tage
                </td>
                <td class="teven">&nbsp;</td>
                <td class="teven" align="left">
                  Bemerkungen: <input type="text" name="fBetriebsferiencomment" value="" size="45" />
                </td>
              </tr>
              <tr>
                <td class="todd">Betriebsferien (Ferien)</td>
                <td class="todd">&nbsp;</td>
                <td class="todd">{sheet.meldeblaetter_ferien_wegen_urlaub_proposal} Tage</td>
                <td class="todd" align="right">
                  <input type="text" name="fBetriebsferienferien" value={sheet.meldeblaetter_ferien_wegen_urlaub} size="2" /> Tage
                </td>
                <td class="todd">&nbsp;</td>
                <td class="todd" align="left">
                  &nbsp;
                </td>
              </tr>
              <tr>
                <td class="teven">zusätzlich Arbeitsfrei</td>
                <td class="teven">&nbsp;</td>
                <td class="teven">&nbsp;</td>
                <td class="teven" align="right">
                  {sheet.meldeblaetter_add_workfree} Tage
                </td>
                <td class="teven">&nbsp;</td>
                <td class="teven">
                  Bemerkungen: <input type="text" name="fZarbeitsfreicomment" value={sheet.meldeblaetter_add_workfree_comment} size="45" />
                </td>
              </tr>
              <tr>
                <td class="todd">Krankheit (Übriges Guthaben: {sheet.krankheitstage_verbleibend} Tage)</td>
                <td class="todd">&nbsp;</td>
                <td class="todd">&nbsp;</td>
                <td class="todd" align="right">
                  <input type="text" name="fKrankheit" value={sheet.meldeblaetter_ill} size="2" /> Tage
                </td>
                <td class="todd">&nbsp;</td>
                <td class="todd">
                  Bemerkungen: <input type="text" name="fKrankheitcomment" value={sheet.meldeblaetter_ill_comment} size="45" />
                </td>
              </tr>
              <tr>
                <td class="teven">Ferien (Übriges Guthaben: ?? Tage)</td>
                <td class="teven">&nbsp;</td>
                <td class="teven">&nbsp;</td>
                <td class="teven" align="right">
                  <input type="text" name="fFerien" value={sheet.meldeblaetter_holiday} size="2" /> Tage
                </td>
                <td class="teven">&nbsp;</td>
                <td class="teven">
                  Bemerkungen: <input type="text" name="fFeriencomment" value={sheet.meldeblaetter_holiday_comment} size="45" />
                </td>
              </tr>
              <tr>
                <td class="todd">Persönlicher Urlaub</td>
                <td class="todd">&nbsp;</td>
                <td class="todd">&nbsp;</td>
                <td class="todd" align="right">
                  <input type="text" name="fUrlaub" value={sheet.meldeblaetter_urlaub} size="2" /> Tage
                </td>
                <td class="todd">&nbsp;</td>
                <td class="todd">
                  Bemerkungen: <input type="text" name="fUrlaubcomment" value={sheet.meldeblaetter_urlaub_comment} size="45" />
                </td>
              </tr>
              <tr>
                <td class="teven">Kleiderspesen</td>
                <td class="teven">&nbsp;</td>
                <td class="teven">{sheet.meldeblaetter_kleider_proposal} Fr.</td>
                <td class="teven" align="right">
                  <input type="text" name="fKleiderspesen" value={sheet.meldeblaetter_kleider} size="5" /> Fr.
                </td>
                <td class="teven">&nbsp;</td>
                <td class="teven">
                  Bemerkungen: <input type="text" name="fKleidercomment" value={sheet.meldeblaetter_kleider_comment} size="45" />
                </td>
              </tr>
              <tr>
                <td class="todd">Fahrspesen</td>
                <td class="todd">&nbsp;</td>
                <td class="todd">&nbsp;</td>
                <td class="todd" align="right">
                  <input type="text" name="fFahrspesen" value={sheet.meldeblaetter_fahrspesen} size="5" /> Fr.
                </td>
                <td class="todd">&nbsp;</td>
                <td class="todd">
                  Bemerkungen: <input type="text" name="fFahrspesencomment" value={sheet.meldeblaetter_fahrspesen_comment} size="45" />
                </td>
              </tr>
              <tr>
                <td class="teven">Ausserordentliche Spesen</td>
                <td class="teven">&nbsp;</td>
                <td class="teven">&nbsp;</td>
                <td class="teven" align="right">
                  <input type="text" name="fAusserordentlich" value={sheet.meldeblaetter_ausserordentlich} size="5" /> Fr.
                </td>
                <td class="teven">&nbsp;</td>
                <td class="teven">
                  Bemerkungen:{' '}
                  <input type="text" name="fAusserordentlichcomment" value={sheet.meldeblaetter_ausserordentlich_comment} size="45" />
                </td>
              </tr>
              <tr>
                <td class="todd">
                  <b>Total</b>
                </td>
                <td class="todd">&nbsp;</td>
                <td class="todd">&nbsp;</td>
                <td class="todd" align="right">
                  <b>{sheet.total} Fr.</b>
                </td>
                <td class="todd">&nbsp;</td>
                <td class="todd">&nbsp;</td>
              </tr>
              <tr>
                <td class="teven">Konto-Nr.</td>
                <td class="teven" />
                <td class="teven">&nbsp;</td>
                <td class="teven" align="right">
                  <input type="text" size="9" name="fKonto" value="4470 (200)" />
                </td>
                <td class="teven">&nbsp;</td>
                <td class="teven">&nbsp;</td>
              </tr>
              <tr>
                <td class="todd">Beleg-Nr.</td>
                <td class="todd">&nbsp;</td>
                <td class="todd">&nbsp;</td>
                <td class="todd" align="right">
                  <input type="text" size="9" name="fBeleg" value="" />
                </td>{' '}
                <td class="todd">&nbsp;</td>
                <td class="todd">&nbsp;</td>
              </tr>
              <tr>
                <td class="teven">Verbucht</td>
                <td class="teven">&nbsp;</td>
                <td class="teven">&nbsp;</td>
                <td class="teven" align="right">
                  <input type="text" size="9" name="fVerbucht" value="" />
                </td>
                <td class="teven">&nbsp;</td>
                <td class="teven">&nbsp;</td>
              </tr>
              <tr>
                <td class="todd">Bezahlt</td>
                <td class="todd">&nbsp;</td>
                <td class="todd">&nbsp;</td>
                <td class="todd" align="right">
                  <input type="text" size="9" name="fBezahlt" value="" />
                </td>{' '}
                <td class="todd">&nbsp;</td>
                <td class="todd">&nbsp;</td>
              </tr>

              <tr>
                <td>
                  <input type="checkbox" name="fDone" id="fidDone" checked="" />
                  <label for="fidDone"> Erledigt</label>
                </td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td align="right">
                  <input type="submit" name="fSubmit" value="Speichern und Aktualisieren" />&nbsp;
                  <a
                    onClick={() => {
                      this.showPDF();
                    }}
                  >
                    PDF anzeigen
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      );
    }

    return (
      <Header>
        <div className="page page__expense">
          <Card>{content}</Card>

          <LoadingView loading={this.state.loading} error={this.state.error} />
        </div>
      </Header>
    );
  }
}
