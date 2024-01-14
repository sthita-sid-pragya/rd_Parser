/**
 * Tokenizer spec.
 */
const Spec = [

    //-----------------------------------------------------------
    // Whitespace:

    [/^\s+/, null], 

     //-----------------------------------------------------------
     // Comments:


     // Skip single-line comments:
    [/^\/\/.*/, null],

    // Skip multi-line comments:
    [/^\/\*[\s\S]*?\*\//, null],
    
    //----------------------------------------------------------------
    // Symbols, delimiters:

    [/^;/, ';'],
    [/^\{/, '{'],
    [/^\}/, '}'],
    [/^\(/, '('],
    [/^\)/, ')'],
    [/^,/, ','],
    [/^\./, '.'],
    [/^\[/, '['],
    [/^\]/, ']'],


    //-----------------------------------------------------------------
    // Keywords:

    [/^\blet\b/, 'let'],
    [/^\bif\b/, 'if'],
    [/^\belse\b/, 'else'],
    [/^\btrue\b/, 'true'],
    [/^\bfalse\b/, 'false'],
    [/^\bnull\b/, 'null'],
    [/^\bwhile\b/, 'while'],
    [/^\bdo\b/, 'do'],
    [/^\bfor\b/, 'for'],
    [/^\bdef\b/, 'def'],
    [/^\breturn\b/, 'return'],
    [/^\bclass\b/, 'class'],
    [/^\bextends\b/, 'extends'],
    [/^\bsuper\b/, 'super'],
    [/^\bnew\b/, 'new'],
    [/^\bthis\b/, 'this'],

    

    //------------------------------------------------------------------
    // Numbers:
    [/^\d+/, 'NUMBER'],




    //-------------------------------------------------------------------
    // Identifiers:

    [/^\w+/, 'IDENTIFIER'],

    //--------------------------------------------------------------------
    // Equality operators: ==, !=

    [/^[=!]=/, 'EQUALITY_OPERATOR'],

    //--------------------------------------------------------------------
    // Assignment operators: =, *=, /=, +=, -=,

    [/^=/, 'SIMPLE_ASSIGN'],
    [/^[\*\/\+\-]=/, 'COMPLEX_ASSIGN'],


    //-----------------------------------------------------------------
    // Math operators: +, -, *, /

    [/^[+\-]/, 'ADDITIVE_OPERATOR'],
    [/^[*\/]/, 'MULTIPLICATIVE_OPERATOR'],

    //------------------------------------------------------------------
    // Relational operators: >, >=, <, <=

    [/^[><]=?/, 'RELATIONAL_OPERATOR'],

    //------------------------------------------------------------------
    // Logical operators: &&, ||

    [/^&&/, 'LOGICAL_AND'],
    [/^\|\|/, 'LOGICAL_OR'],
    [/^!/, 'LOGICAL_NOT'],



    // ----------------------------------------------------------
    // Numbers:

    //[/^\d+/, 'NUMBER'],

        //-----------------------------------------------------
     // Strings:

    [/^"[^"]*"/, 'STRING'],
    [/^'[^']*'/, 'STRING'],
];





/**
 * Tokenizer class.
 * 
 * Lazily pulls a token from a stram
 */
class Tokenizer
{
    /**
     * Initializes the string.
     */
    init(string)
    {
        this._string = string;
        this._cursor = 0;
    }

    /**
     *  Whether the tokenizer reached EOF
     */
    isEOF()
    {
        return this._cursor === this._string.length;
    }

    hasMoreTokens()
    {
        return this._cursor < this._string.length;
    }

    /**
     * Returns next token on demand
     */
    getNextToken()
    {
        if(!this.hasMoreTokens())
        {
            return null;
        }

        const string = this._string.slice(this._cursor);

        for (const [regexp, tokenType] of Spec)
        {
            const tokenValue = this._match(regexp, string);
            
            // Coun't match this rule, continue.
            if(tokenValue == null)
            {
                continue;
            }
            
            // Should skip token, e.g. whitespace.

            if (tokenType == null)
            {
                return this.getNextToken();
            }


            return{
                type: tokenType,
                value: tokenValue,
            };
        }

        // Numbers: \d+
        // let matched = /^\d+/.exec(string);
        // if(matched !== null)
        // { 
        //     this._cursor += matched[0].length;
        //     return {
            
        //         type: 'NUMBER',
        //         value: matched[0], 
        //     };
        // }
        

        // String:
        // matched = /^'[^']*'/.exec(string);
        // if(matched !== null)
        // {
        //     this._cursor += matched[0].length;
        //     return {
        //         type: 'STRING',
        //         value: matched[0],
        //     };
        // }
        throw new SyntaxError(`Unexpected token: "${string[0]}"`);
    }




    /**
     * Matches a token for a regular expression.
     */
    _match(regexp, string)
    {
        const matched = regexp.exec(string);
        if(matched == null)
            return null;

        this._cursor += matched[0].length;
        return matched[0];
    }
}


module.exports = {
    Tokenizer,
};