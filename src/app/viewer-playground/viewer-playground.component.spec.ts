import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLineModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CountQueryResponse, ReadResourceSequence, SearchEndpointV2 } from '@dasch-swiss/dsp-js';
import { DspApiConnectionToken, DspViewerModule } from '@dasch-swiss/dsp-ui';
import { of } from 'rxjs';
import { ViewerPlaygroundComponent } from './viewer-playground.component';

describe('ViewerPlaygroundComponent', () => {
    let component: ViewerPlaygroundComponent;
    let fixture: ComponentFixture<ViewerPlaygroundComponent>;

    beforeEach(async(() => {

        const searchSpyObj = {
            v2: {
                search: jasmine.createSpyObj('search', ['doFulltextSearch', 'doFulltextSearchCountQuery', 'doExtendedSearchCountQuery', 'doExtendedSearch']),
            }
        };

        TestBed.configureTestingModule({
            declarations: [
                ViewerPlaygroundComponent
            ],
            imports: [
                DspViewerModule,
                MatIconModule,
                MatLineModule,
                MatListModule
            ],
            providers: [
                {
                    provide: DspApiConnectionToken,
                    useValue: searchSpyObj
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        const searchSpy = TestBed.inject(DspApiConnectionToken);

        // fulltext search
        (searchSpy.v2.search as jasmine.SpyObj<SearchEndpointV2>).doFulltextSearchCountQuery.and.returnValue(
            of({} as CountQueryResponse)
        );
        (searchSpy.v2.search as jasmine.SpyObj<SearchEndpointV2>).doFulltextSearch.and.returnValue(
            of({} as ReadResourceSequence)
        );

        // extended search example
        (searchSpy.v2.search as jasmine.SpyObj<SearchEndpointV2>).doExtendedSearchCountQuery.and.returnValue(
            of({} as CountQueryResponse)
        );
        (searchSpy.v2.search as jasmine.SpyObj<SearchEndpointV2>).doExtendedSearch.and.returnValue(
            of({} as ReadResourceSequence)
        );

        fixture = TestBed.createComponent(ViewerPlaygroundComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});