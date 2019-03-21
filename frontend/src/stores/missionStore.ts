import { action, computed, observable } from 'mobx';
import { MainStore } from './mainStore';
import { DomainStore } from './domainStore';
import { Mission } from '../types';

export class MissionStore extends DomainStore<Mission> {
  protected get entityName() {
    return {
      singular: 'Der Zivildiensteinsatz',
      plural: 'Die Zivildiensteinsätze',
    };
  }

  @computed
  get entities(): Array<Mission> {
    return this.missions;
  }

  @computed
  get entity(): Mission | undefined {
    return this.mission;
  }

  set entity(holiday: Mission | undefined) {
    this.mission = holiday;
  }

  @observable
  public missions: Mission[] = [];

  @observable
  public mission?: Mission;

  constructor(mainStore: MainStore) {
    super(mainStore);
  }

  @action
  protected async doDelete(id: number) {
    await this.mainStore.api.delete('/missions/' + id);
    await this.doFetchAll();
  }

  @action
  protected async doFetchAll() {
    const res = await this.mainStore.api.get<Mission[]>('/missions');
    this.missions = res.data;
  }

  @action
  public async fetchByYear(year: string) {
    const res = await this.mainStore.api.get<Mission[]>('/missions/' + year);
    this.missions = res.data;
  }

  // @action
  // public async doFetchOne(id: number) {
  //   const response = await this.mainStore.api.get<Mission>('/missions/' + id);
  //   this.mission = response.data;
  // }

  @action
  protected async doPost(holiday: Mission) {
    const response = await this.mainStore.api.post<Mission[]>('/missions', holiday);
    this.missions = response.data;
  }

  @action
  protected async doPut(holiday: Mission) {
    const response = await this.mainStore.api.put<Mission[]>('/missions/' + holiday.id, holiday);
    this.missions = response.data;
  }

  public async calcEligibleDays(start: string, end: string) {
    const response = await this.mainStore.api.get<EligibleDays>('/mission_days/eligible_days?start=' + start + '&end=' + end);
    return response.data;
  }

  public async calcPossibleEndDate(start: string, days: number) {
    const response = await this.mainStore.api.get<PossibleEndDate>('/mission_days/possible_end_date?start=' + start + '&days=' + days);
    return response.data;
  }

  @action
  public async doPutDraft(id: number) {
    const response = await this.mainStore.api.get<Mission>('/missions/' + id + '/draft');
    return response.data;
  }
}

interface EligibleDays {
  data: string;
}

interface PossibleEndDate {
  data: string;
}
