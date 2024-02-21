import { Type } from "@angular/core";

export interface dynamicComponent { component: Type<any>, inputs: Record<string, unknown> }