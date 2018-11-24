 import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';

describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {
        assert.deepEqual(
            parseCode(''),
            []
        );
    });

    it('is parsing a simple return declaration correctly', () => {
        assert.deepEqual(
            parseCode('function binarySearch(X, V, n){\n' +
                '    return -1;\n' +
                '}'),
            [{'line':1 , 'type':'Function Declaration', 'name':'binarySearch', 'condition':'', 'value':''},
                {'line':1 , 'type':'Variable Declaration', 'name':'X', 'condition':'', 'value':''},
                {'line':1 , 'type':'Variable Declaration', 'name':'V', 'condition':'', 'value':''},
                {'line':1 , 'type':'Variable Declaration', 'name':'n', 'condition':'', 'value':''},
                {'line':2 , 'type':'Return Statement', 'name':'', 'condition':'', 'value':'-1'}
            ]
        );
    });

    it('is parsing a simple while declaration correctly', () => {
        assert.deepEqual(
            parseCode('function test(X){\n' +
                '    while(x < 0){\n' +
                'x=x+1;}\n' +
                '}'),
            [
                {'line':1 , 'type':'Function Declaration', 'name':'test', 'condition':'', 'value':''},
                {'line':1 , 'type':'Variable Declaration', 'name':'X', 'condition':'', 'value':''},
                {'line':2 , 'type':'While Statement', 'name':'', 'condition':'x < 0', 'value':''},
                {'line':3 , 'type':'Assignment Expression', 'name':'x', 'condition':'', 'value':'x + 1'}
            ]
        );
    });

    it('is parsing a for loop correctly', () => {
        assert.deepEqual(
            parseCode('function test(c){ for(i=0;i<1;i++){x=x+1;}}'),
            [
                {'line':1 , 'type':'Function Declaration', 'name':'test', 'condition':'', 'value':''},
                {'line':1 , 'type':'Variable Declaration', 'name':'c', 'condition':'', 'value':''},
                {'line':1 , 'type':'For Statement Init', 'name':'', 'condition':'', 'value':'i = 0'},
                {'line':1 , 'type':'For Statement Test', 'name':'', 'condition':'i < 1', 'value':''},
                {'line':1 , 'type':'For Statement Update', 'name':'', 'condition':'', 'value':'i++'},
                {'line':1 , 'type':'Assignment Expression', 'name':'x', 'condition':'', 'value':'x + 1'}
            ]
        );
    });

    it('is parsing a verDecl correctly', () => {
        assert.deepEqual(
            parseCode('function test(c){ let a =0; let b;}'),
            [
                {'line':1 , 'type':'Function Declaration', 'name':'test', 'condition':'', 'value':''},
                {'line':1 , 'type':'Variable Declaration', 'name':'c', 'condition':'', 'value':''},
                {'line':1 , 'type':'Variable Declaration', 'name':'a', 'condition':'', 'value':'0'},
                {'line':1 , 'type':'Variable Declaration', 'name':'b', 'condition':'', 'value':''}
            ]
        );
    });

    it('is parsing an if statment correctly', () => {
        assert.deepEqual(
            parseCode('function test(c){if(c<0) x=x+1; else x=x+2;}'),
            [
                {'line':1 , 'type':'Function Declaration', 'name':'test', 'condition':'', 'value':''},
                {'line':1 , 'type':'Variable Declaration', 'name':'c', 'condition':'', 'value':''},
                {'line':1 , 'type':'If Statement', 'name':'', 'condition':'c < 0', 'value':''},
                {'line':1 , 'type':'Assignment Expression', 'name':'x', 'condition':'', 'value':'x + 1'},
                {'line':1 , 'type':'Assignment Expression', 'name':'x', 'condition':'', 'value':'x + 2'}
            ]
        );
    });

    it('is parsing an if with block correctly', () => {
        assert.deepEqual(
            parseCode('function test(c){if(c<0) {x=x+1;} else {x=x+2;}}'),
            [
                {'line':1 , 'type':'Function Declaration', 'name':'test', 'condition':'', 'value':''},
                {'line':1 , 'type':'Variable Declaration', 'name':'c', 'condition':'', 'value':''},
                {'line':1 , 'type':'If Statement', 'name':'', 'condition':'c < 0', 'value':''},
                {'line':1 , 'type':'Assignment Expression', 'name':'x', 'condition':'', 'value':'x + 1'},
                {'line':1 , 'type':'Assignment Expression', 'name':'x', 'condition':'', 'value':'x + 2'}
            ]
        );
    });

    it('is parsing an if without else with block correctly', () => {
        assert.deepEqual(
            parseCode('function test(c){if(c<0) {x=x+1;}}'),
            [
                {'line':1 , 'type':'Function Declaration', 'name':'test', 'condition':'', 'value':''},
                {'line':1 , 'type':'Variable Declaration', 'name':'c', 'condition':'', 'value':''},
                {'line':1 , 'type':'If Statement', 'name':'', 'condition':'c < 0', 'value':''},
                {'line':1 , 'type':'Assignment Expression', 'name':'x', 'condition':'', 'value':'x + 1'}
            ]
        );
    });

    it('is parsing a single else  correctly', () => {
        assert.deepEqual(
            parseCode('function test(c){if(c<0) {x=x+1;} else x=x+2;}'),
            [
                {'line':1 , 'type':'Function Declaration', 'name':'test', 'condition':'', 'value':''},
                {'line':1 , 'type':'Variable Declaration', 'name':'c', 'condition':'', 'value':''},
                {'line':1 , 'type':'If Statement', 'name':'', 'condition':'c < 0', 'value':''},
                {'line':1 , 'type':'Assignment Expression', 'name':'x', 'condition':'', 'value':'x + 1'},
                {'line':1 , 'type':'Assignment Expression', 'name':'x', 'condition':'', 'value':'x + 2'}
            ]
        );
    });
});
