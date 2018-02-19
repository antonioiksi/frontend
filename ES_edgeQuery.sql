select
	[Tbl_3].[total].value('.[1]','bigint') 'total' 
	,replace([Tbl_4].[results].value('./_index[1]','VARCHAR(MAX)'),'_'+[Tbl_4].[results].value('./_type[1]','VARCHAR(MAX)'),'') as 'database'
	,[Tbl_4].[results].value('./_type[1]','VARCHAR(MAX)') as 'table'
	,[Tbl_4].[results].query('./_source') as 'source'
	,[Tbl_4].[results].value('./highlight[1]','VARCHAR(MAX)') as 'highlight'
from
	(
		select
			[Tbl_2].[answer].query('./total') 'total'
			,[Tbl_2].[answer].query('./hits') 'hits'
		from
			(
				select
					cast(
						[ElasticSearch].[dbo].[convertJSONtoXML](
							[ElasticSearch].[dbo].sendESQuery(
								N'http://172.16.9.88:9200/florizel*/_search?pretty&size=5000'
								,'POST'
								,CAST(N'{"explain":true,"query":{"query_string":{"fields":["*.*edgephone"],"query":"+7032353612~2","analyzer":"whitespace","lenient":true}} ,"highlight":{"encoder":"html","fields":{"*.*edgephone":{"type":"plain"} } } }' AS VARBINARY(MAX)))
							,'ESRequest'
					)
					as XML).query('/ESRequest')
			) [Tbl_1](ESRequest) 
		cross apply
			[Tbl_1].[ESRequest].nodes('/*/hits') as [Tbl_2](answer)
	)  [Tbl_3](total,hits)
cross apply
	[Tbl_3].[hits].nodes('/hits') as [Tbl_4](results)
;