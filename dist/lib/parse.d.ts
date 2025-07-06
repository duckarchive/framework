export declare const parseDBParams: (str: string | null) => Record<string, string>;
export declare const stringifyDBParams: (data: Record<string, string | number | boolean>) => string;
export declare const parseCode: (str: string, ignoreError?: boolean) => string;
export declare const parseTitle: (str?: string) => string;
interface MetaItem {
    raw: string;
    fund: string;
    description: string;
    casesRange: [string, string?];
}
export declare const parseMeta: (str: string) => MetaItem[];
export declare const parseArchive: (str: string) => string;
export interface MetaTree {
    [archiveId: string]: {
        [fundCode: string]: {
            [descriptionCode: string]: {
                [caseCode: string]: string[];
            };
        };
    };
}
export declare const meta2tree: (raw: string, dgs: string, raw_archive: string) => MetaTree;
export {};
