//tslint:disable:no-console
import { action, observable } from 'mobx';
import { MainStore } from './mainStore';

/**
 * This class wraps all common store functions with success/error popups. The desired methods that start with "do" should be overriden in the specific stores.
 */
export class DomainStore<T, OverviewType = T> {
  constructor(protected mainStore: MainStore) {}

  protected get entityName() {
    return { singular: 'Die Entität', plural: 'Die Entitäten' };
  }

  public get entity(): T | undefined {
    throw new Error('Not implemented');
  }

  public set entity(e: T | undefined) {
    throw new Error('Not implemented');
  }

  public get entities(): Array<OverviewType> {
    throw new Error('Not implemented');
  }

  @observable
  public filteredEntities: OverviewType[] = [];

  public filter: () => void = () => {};

  @action
  public async fetchAll(params: object = {}) {
    try {
      await this.doFetchAll(params);
    } catch (e) {
      this.mainStore.displayError(`${this.entityName.plural} konnten nicht geladen werden.`);
      console.error(e);
      throw e;
    }
  }

  protected async doFetchAll(params: object = {}) {
    throw new Error('Not implemented');
  }

  @action
  public async fetchOne(id: number) {
    try {
      this.entity = undefined;
      return await this.doFetchOne(id);
    } catch (e) {
      this.mainStore.displayError(`${this.entityName.plural} konnten nicht geladen werden.`);
      console.error(e);
      throw e;
    }
  }

  protected async doFetchOne(id: number): Promise<T | void> {
    throw new Error('Not implemented');
  }

  @action
  public async post(entity: T) {
    this.displayLoading(async () => {
      try {
        await this.doPost(entity);
        this.mainStore.displaySuccess(`${this.entityName.singular} wurde gespeichert.`);
      } catch (e) {
        this.mainStore.displayError(`${this.entityName.singular} konnte nicht gespeichert werden.`);
        console.error(e);
        throw e;
      }
    });
  }

  protected async doPost(entity: T) {
    throw new Error('Not implemented');
  }

  @action
  public async put(entity: T) {
    this.displayLoading(async () => {
      try {
        await this.doPut(entity);
        this.mainStore.displaySuccess(`${this.entityName.singular} wurde gespeichert.`);
      } catch (e) {
        this.mainStore.displayError(`${this.entityName.singular} konnte nicht gespeichert werden.`);
        console.error(e);
        throw e;
      }
    });
  }

  @action
  protected async doPut(entity: T) {
    throw new Error('Not implemented');
  }

  @action
  public async delete(id: number | string) {
    this.displayLoading(async () => {
      try {
        await this.doDelete(id);
        this.mainStore.displaySuccess(`${this.entityName.singular} wurde gelöscht.`);
      } catch (e) {
        this.mainStore.displayError(`${this.entityName.singular} konnte nicht gelöscht werden.`);
        console.error(e);
        throw e;
      }
    });
  }

  @action
  protected async doDelete(id: number | string) {
    throw new Error('Not implemented');
  }

  public async displayLoading<P>(f: () => Promise<P>) {
    //TODO: trigger loading indicator in MainStore
    await f();
  }

  public async notifyProgress<P>(f: () => Promise<P>, { errorMessage = 'Fehler!', successMessage = 'Erfolg!' } = {}) {
    this.displayLoading(async () => {
      try {
        await f();
        if (successMessage) {
          this.mainStore.displaySuccess(successMessage);
        }
      } catch (e) {
        if (successMessage) {
          this.mainStore.displayError(errorMessage);
        }
        console.error(e);
        throw e;
      }
    });
  }
}
