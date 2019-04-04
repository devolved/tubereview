# Tube Review - Youtube channel review site

**Node / Express / MongoDB / Handlebars**

Making this up as I go along, so no roadmap but have a few features that spring to mind

- Add: Fetch YouTube data on either URL or channel name add (not sure which is more noob proof) :black_check_mark:
- Add: Preview in aside on fetch data :black_check_mark:
- Review: Theme reviews with channel art :black_check_mark:
- Review: Add channel info such as sub count :black_check_mark:
- Channels: List of channels reviewed with review count
- Channels: Reviewed by list
- Channels: Preview of top (or only) review
- User: Top reviewers > review the reviewers (oooh meta!)
- User: login > top reviews etc etc

## Version 2

Reworking DB storage to reduce number of docs in collection. (limited RAM on dev machine)

- Channels: List of channels reviewed with review count
- Actually have a numerical rating (average of reviews)
- Space for reviewed by (all same user for now)
