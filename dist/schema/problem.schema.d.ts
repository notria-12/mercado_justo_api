import * as mongoose from 'mongoose';
export declare const tipoProblema: readonly ["erro_tela_leitor", "produto_sem_cadastro"];
export declare type TipoProblema = typeof tipoProblema[number];
export declare type ProblemDocument = Problem & mongoose.Document;
export declare class Problem {
    codigo_barras: string;
    data_hora: Date;
    tipo: TipoProblema;
}
export declare const ProblemSchema: mongoose.Schema<Problem, mongoose.Model<Problem, any, any, any, any>, {}, {}, {}, {}, "type", Problem>;
