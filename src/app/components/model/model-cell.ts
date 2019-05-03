import * as THREE from 'three';

export abstract class ModelCell {
    static NET = 'NET';
    static BIAS = 'BIAS';
    static INPUT = 'INPUT';
    static OUTPUT = 'OUTPUT';

    netSize = 0.1;

    cellType: string;
    layerIndex: number;
    seqIndex: number;
    label: string;
    activation: string;

    xyz: number[] = [0, 0, 0];
    cellMesh: THREE.Mesh;
    linkToList: ModelCell[] = [];
    linkFromList: ModelCell[] = [];

    constructor() {}

    protected abstract createMesh(): THREE.Mesh;
    protected abstract createExtra():void;

    create(viewScene: THREE.Scene): void {
       this.createMesh();

       this.cellMesh.matrixAutoUpdate = false;
       this.cellMesh.position.x = this.xyz[0];
       this.cellMesh.position.y = this.xyz[1];
       this.cellMesh.position.z = this.xyz[2];
       this.cellMesh.updateMatrix();
       viewScene.add(this.cellMesh);
       
       this.createExtra();
       if (this.label != null) {
        this.createCellLabel();
      }
    }

    createCellLabel(): void {
    }

    linkTo(cell: ModelCell): void {
       this.linkToList.push(cell);
    }

    linkFrom(cell: ModelCell): void {
        this.linkFromList.push(cell);
     }

    setXyz(x: number, y: number, z: number) {
      this.xyz[0] = x;
      this.xyz[1] = y;
      this.xyz[2] = z;
    }
}