import { TestBed } from '@angular/core/testing';

import { PlotlyGraph } from './plotly-graph';

describe('PlotlyGraph', () => {
  let service: PlotlyGraph;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlotlyGraph);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
