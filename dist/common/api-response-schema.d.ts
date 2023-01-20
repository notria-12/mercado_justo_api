export declare const ApiResSchema: {
    apply: (schema: any) => {
        schema: {
            type: string;
            properties: {
                mensagem: {
                    type: string;
                };
                dados: {
                    type: string;
                    $ref: string;
                };
                timestamp: {
                    type: string;
                    format: string;
                };
            };
        };
    };
    applyArr: (schema: any) => {
        schema: {
            type: string;
            properties: {
                mensagem: {
                    type: string;
                };
                dados: {
                    type: string;
                    items: {
                        type: string;
                        $ref: string;
                    };
                };
                timestamp: {
                    type: string;
                    format: string;
                };
            };
        };
    };
    applyType: (thisType: any) => {
        schema: {
            type: string;
            properties: {
                mensagem: {
                    type: string;
                };
                dados: {
                    type: any;
                };
                timestamp: {
                    type: string;
                    format: string;
                };
            };
        };
    };
};
