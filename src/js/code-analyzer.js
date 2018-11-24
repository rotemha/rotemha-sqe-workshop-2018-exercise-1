import * as esprima from 'esprima';
var escodegen = require('escodegen');
var arr=[];

const parseCode = (codeToParse) => {
    if(codeToParse==='') {
        return arr;
    }
    arr = [];
    var result = esprima.parseScript(codeToParse, {loc: true});
    parseFuncDecl(result['body'][0]);
    for(var x in result['body'][0]['body']['body']){
        parseFuncBody(result['body'][0]['body']['body'][x]);
    }
    return arr;

};

const parseFuncDecl = (FuncDecl_Json) =>{
    arr.push({'line':FuncDecl_Json['id']['loc']['start'].line , 'type':'Function Declaration', 'name':FuncDecl_Json['id']['name'], 'condition':'', 'value':''});
    var param = FuncDecl_Json['params'];
    for (var k in param){
        arr.push({'line':param[k]['loc']['start'].line , 'type':'Variable Declaration', 'name':param[k].name, 'condition':'', 'value':''});
    }
    return arr;

};

const parseFuncBody = (Body_json) =>{
    switch (Body_json.type){
    case 'VariableDeclaration':
        parseVariDec(Body_json.declarations);
        break;
    case 'ExpressionStatement':
        arr.push({'line': Body_json.expression.loc.start.line, 'type':'Assignment Expression', 'name':escodegen.generate(Body_json.expression.left),'condition':'','value':escodegen.generate(Body_json.expression.right)});
        break;
    case 'WhileStatement':
        parseWhile(Body_json);
        break;
    default:
        conti(Body_json);
        break;
    }
};

const conti =(Body_json)=>{
    switch (Body_json.type){
    case 'ReturnStatement':
        arr.push({'line':Body_json.loc.start.line , 'type':'Return Statement', 'name':'', 'condition':'', 'value':escodegen.generate(Body_json.argument)});
        break;
    case 'ForStatement':
        parseForStatment(Body_json);
        break;
    case 'IfStatement':
        parseIfStatement(Body_json);
        break;
    }};



const parseVariDec = (var_json) => {
    for (var x in var_json){
        if(var_json[x].init!=null)
            arr.push({'line':var_json[x].loc.start.line , 'type':'Variable Declaration', 'name':var_json[x].id.name, 'condition':'', 'value':escodegen.generate(var_json[x].init)});
        else arr.push({'line':var_json[x].loc.start.line , 'type':'Variable Declaration', 'name':var_json[x].id.name, 'condition':'', 'value':''});
    }
};

const parseWhile = (input)=>{
    arr.push({'line':input.test.loc.start.line, 'type':'While Statement', 'name':'','condition':escodegen.generate(input.test),'value':''});
    for(var x in input.body.body)
        parseFuncBody(input.body.body[x]);
};
const parseIfStatement = (input)=>{
    arr.push({'line': input.test.loc.start.line, 'type':'If Statement', 'name':'','condition':escodegen.generate(input.test),'value':''});
    if(input.consequent.type==='BlockStatement'){
        for(var x in input.consequent.body)
            parseFuncBody(input.consequent.body[x]);
    }
    else {
        parseFuncBody(input.consequent);
    }
    if(input.alternate!=null)
        parseAlt(input.alternate);

};

const parseAlt =(input)=>{
    if (input.type ==='BlockStatement') {
        for (var x in input.body)
            parseFuncBody(input.body[x]);
    }
    else parseFuncBody(input);

};

const parseForStatment=(input)=>{
    arr.push({'line': input.init.loc.start.line, 'type':'For Statement Init', 'name':'','condition':'','value':escodegen.generate(input.init)});
    arr.push({'line': input.test.loc.start.line, 'type':'For Statement Test', 'name':'','condition':escodegen.generate(input.test),'value':''});
    arr.push({'line': input.update.loc.start.line, 'type':'For Statement Update', 'name':'','condition':'','value':escodegen.generate(input.update)});
    for(var x in input.body.body)
        parseFuncBody(input.body.body[x]);
};
export {parseCode};
