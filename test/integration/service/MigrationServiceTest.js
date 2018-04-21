import {expect} from 'chai';
import _ from "lodash";
import MigrationService from "../../../src/service/MigrationService";
import Tester from "../Tester";

describe('MigrationServiceTest', () => {
    it('copyCollections', () => {
        Tester.login().then(() => {
            MigrationService.copyCollections(["State Questions"], "Bihar");
        });
    });
});